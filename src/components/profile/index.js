import {Image, Text, View} from 'react-native';
import {styles} from './styles';
import React, {useState, useEffect} from 'react';
import {Card} from '@rneui/themed';
import {findUserAuthenticated} from '../../../AuthService';
import {findByUid} from '../../services/UserService';
import AptitudeOffer from '../aptitudeOffer';
import ButtonMoreAbilities from '../buttonMoreAbilities';

export default function Profile() {
  const [userAuth, setUserAuth] = useState();
  const [expandAptitude, setExpandAptitude] = useState(false);

  useEffect(() => {
    const getAbilitiesByUidUser = async () => {
      let userAuthenticated = await findUserAuthenticated();
      let user = await findByUid(userAuthenticated.uid);
      setUserAuth(user);
    };
    getAbilitiesByUidUser();
  }, []);

  let minAbilities = userAuth?.abilities.length - 5;
  console.log(minAbilities);

  return (
    <View>
      <Text style={styles.mismatchs}>Mi Perfil</Text>
      <Card>
        <View style={styles.containerrrr}>
          <Image
            style={styles.img}
            source={require('../../images/tinwork-logo.png')}
          />
          <View style={styles.nombreymail}>
            <Text style={styles.titulos}>Nombre Completo</Text>
            <Text style={styles.datos}>{userAuth?.name || ''}</Text>
            <Text style={styles.titulos}>E-Mail</Text>
            <Text style={styles.datos}>{userAuth?.email || ''}</Text>
          </View>
        </View>
        <Text style={styles.titulos}>Nombre Completo</Text>
        <View style={styles.datos}>
          <View style={styles.buttonsContainer}>
            {userAuth?.abilities.slice(0, 5).map((ability, index) => (
              <AptitudeOffer title={ability} key={index} />
            ))}
            {!expandAptitude
              ? userAuth?.abilities.length > minAbilities && (
                  <ButtonMoreAbilities
                    buttonStyle={false}
                    titleStyle={false}
                    title={`+${minAbilities}`}
                    onPress={() => setExpandAptitude(true)}
                  />
                )
              : userAuth?.abilities
                  .slice(5, userAuth?.abilities.length)
                  .map((ability, index) => (
                    <AptitudeOffer title={ability} key={index} />
                  ))}
            {expandAptitude && (
              <ButtonMoreAbilities
                buttonStyle={false}
                titleStyle={false}
                title={`Ver Menos`}
                onPress={() => setExpandAptitude(false)}
              />
            )}
          </View>
        </View>
      </Card>
    </View>
  );
}
