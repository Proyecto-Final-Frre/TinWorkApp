import React, { useState, useEffect } from 'react';
import { View, Text , ScrollView, Image,TouchableOpacity,RefreshControl   } from 'react-native';
import { findUserAuthenticated } from '../../../AuthService';
import { findByUid } from '../../services/UserService';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';  // Importa useNavigation
import { styles } from './styles';


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
        console.error("No se encontró un usuario autenticado.");
        return;
      }
  
      const { offersMatch } = await findByUid(userAuthenticated.uid);
      if (!offersMatch || offersMatch.length === 0) {
        setRecrutiersData([]);
        return;
      }
  
      const recruiterUids = offersMatch.map((offer) => offer.uid);
  
      // Recuperar datos de reclutadores en paralelo
      const recruitersData = await Promise.all(
        recruiterUids.map((uid) => findByUid(uid))
      );
  
      // Filtrar reclutadores únicos por uid
      const uniqueRecruitersData = recruitersData.filter(
        (recruiter, index, self) =>
          index === self.findIndex((r) => r?.uid === recruiter?.uid)
      );
  
      // Actualizar el estado con los datos únicos
      setRecrutiersData(uniqueRecruitersData);
    } catch (error) {
      console.error("Error al recuperar reclutadores:", error);
    } finally {
      setLoading(false); // Finalizar la carga
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
            ¡Aún no tienes chats! No has hecho match con ningún reclutador todavía.</Text>
          </View>
        ) :
        recrutiersData.length > 0 && recrutiersData.map((recrutier, index) => (
          recrutier?.imageProfile && recrutier?.name  ? (            
       
          <TouchableOpacity
          key={recrutier?.uid}
          onPress={() => handlePress(recrutier)} 
          >
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
          </TouchableOpacity>    ) : null 

        ))}
      </ScrollView>
  );
};

export default ChatList;
