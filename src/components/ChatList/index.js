import React, { useState, useEffect } from 'react';
import { View, Text , ScrollView, Image,TouchableOpacity,RefreshControl   } from 'react-native';
import { findUserAuthenticated } from '../../../AuthService';
import { findByUid } from '../../services/UserService';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';  // Importa useNavigation
import { styles } from './styles';
import { findOfferByUid } from '../../services/OfferService';


const ChatList = () => {
  const [recrutiersData, setRecrutiersData] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); 
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await setRecruiter();
    setRefreshing(false);
  };
    
  const setRecruiter = async () => {
    setLoading(true);
    try {
      const userAuthenticated = findUserAuthenticated();
      if (!userAuthenticated) {
        return;
      }
  
      const candidate = await findByUid(userAuthenticated.uid);
      const { interestingOffers } = candidate;
  
      if (!interestingOffers || interestingOffers.length === 0) {
        setRecrutiersData([]);
        return;
      }
  
      // Obtener todas las ofertas que le interesaron
      const offers = await Promise.all(
      interestingOffers.map(async (offerId) => {
        const offer = await findOfferByUid(offerId);
        return offer;
          })
        );
      // Obtener los UID de los reclutadores
      const recruiterUids = offers
      .map((offer) => offer?.uid) // <- usa "uid", que es el del reclutador
      .filter((uid) => !!uid);
        
        // Eliminar duplicados
        const uniqueRecruiterUids = [...new Set(recruiterUids)];    
        // Obtener los datos de los reclutadores
        const recruitersData = [];
      for (const uid of uniqueRecruiterUids) {
        const recruiter = await findByUid(uid);
        if (recruiter) {
          recruitersData.push(recruiter);
        } else {
          console.log(`No se encontró reclutador con uid: ${uid}`);
        }
}

  
      setRecrutiersData(recruitersData);
    } catch (error) {
      console.error("Error al recuperar reclutadores del chat:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRecruiter();
  }, []);

  const handlePress = (recrutier) => { navigation.navigate('Chat', { recrutier }) };


  return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >    
        {loading ? (
           <View style={styles.skeletonContainer}>
                {[...Array(6)].map((_, index) => (
                  <View style={styles.skeletonMatch} key={index}>
                    <View style={styles.skeletonImage} />
                    <View style={styles.skeletonDetails}>
                      <View style={styles.skeletonLine} />
                      <View style={[styles.skeletonLine, styles.shortLine]} />
                      <View style={[styles.skeletonLine, styles.chatLine]} /> 
                    </View>
                  </View>
                ))}
              </View>
        ) :  recrutiersData.length === 0 ? (
          <View style={styles.emptyMessageContainer}>
          <Image
            source={require('../../images/sin-chats.png')} 
            style={styles.img}
            resizeMode='center'
          />
          <Text style={styles.emptyMessage}>
            ¡Aún no tienes chats!.{'\n'}Explora las oportunidades disponibles.</Text>
          </View>
        ) :
        recrutiersData.length > 0 && recrutiersData.map((recrutier, index) => (                 
          <TouchableOpacity key={recrutier?.uid} onPress={() => handlePress(recrutier)}>
            <View style={styles.recrutierContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: recrutier?.imageProfile }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.jobTitle}><Text style={styles.name}>{recrutier?.name}</Text></Text>
                <Icon name="chat" size={24} style={styles.icon} />
              </View>
            </View>
          </TouchableOpacity>    

        ))}
      </ScrollView>
  );
};

export default ChatList;
