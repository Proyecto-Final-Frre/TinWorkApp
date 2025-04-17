import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { findUserAuthenticated } from '../../../AuthService';
import { findByUid } from '../../services/UserService';
import { CARD, FONT_SIZE, FUENTES, fuentes } from '../../utils/constants';
import offerMaletin from '../../../src/images/maletin.png';
import { styles } from './styles';
import { formatDistance } from 'date-fns';
import { es as esLocale } from 'date-fns/locale';

const MatchList = () => {
  const [matchs, setMatchs] = useState([]);
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await setUser();
    setRefreshing(false);
  };

  const setUser = async () => {
    setLoading(true)
    try {
      let userAuthenticated = findUserAuthenticated();
      const { offersMatch } = await findByUid(userAuthenticated.uid);
      setMatchs(offersMatch);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  const dataOffer = (dateOffer) => {
    if (!dateOffer?.seconds) return 'Sin fecha';
  
    const date = new Date(dateOffer.seconds * 1000 + Math.floor(dateOffer.nanoseconds / 1000000));
    return formatDistance(date, new Date(), { locale: esLocale });
  };
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
      ) : matchs.length === 0 ? (
        <View style={styles.emptyMessageContainer}>
          <Image
            style={styles.img_2}
            source={require('../../images/sin-trabajo.png')} />
          <Text style={styles.emptyMessage}>
            ¡Aún no has encontrado tu match perfecto!. Sigue explorando nuestras ofertas.</Text>
        </View>
      )
        :
        matchs.map((match, index) => (

          <View style={styles.matchContainer} key={`${match.id}-${index}`}>
             {console.log("🚀 ~ MatchList ~ match:", match.dateOffer/*.toDate()*/)}
            <Image
              style={styles.img}
              source={match?.logoURL ? { uri: match.logoURL } : offerMaletin}
            />

            <View style={styles.detailContainer}>
              <Text style={styles.company}>{match.companyName}</Text>
              <Text style={styles.jobTitle}>{match.title}</Text>

              <View style={styles.row}>
                <View style={styles.iconText}>
                  <Icon name="location-pin" size={15} color="red" />
                  <Text style={styles.textSpec}>
                    {match.province}, {match.country}
                  </Text>
                </View>

                <View style={styles.iconText}>
                  <Text style={styles.textSpec}>💼 {match.workDay}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.iconText}>
                  <Text style={styles.textSpec}>📅 Hace {dataOffer(match?.dateOffer)}</Text>
                </View>

                <View style={styles.iconText}>
                  <Text style={styles.textSpec}>💼 {match.workModality}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}





    </ScrollView>
    // </View>
  );
};


export default MatchList;
