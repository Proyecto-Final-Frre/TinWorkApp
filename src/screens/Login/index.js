import React from 'react';
import {View, Text} from 'react-native';
import {authenticationWithGoogle, singOutGoogle} from '../../../AuthService';
import {Button} from '../../components';
import {create, findByUid} from '../../services/UserService';
import messaging from '@react-native-firebase/messaging';

function onGoogleButtonPress() {
  return authenticationWithGoogle().then(response => {
    return findByUid(response.user.uid).then(async user => {
      const token = await messaging().getToken();

      return await create({
        uid: user.uid,
        abilities: user.abilities,
        name: user.name,
        email: user.email,
        token: token,
      });
    });
  });
}

export default function LoginScreen({navigation}) {
  return (
    <>
      <View>
        <Button
          title={'Ir a Habilidades'}
          onPress={() =>
            onGoogleButtonPress()
              .then(() => navigation.navigate('Habilidades'))
              .catch(err => console.log('error', err))
          }
        />
        <Button
          title={'Ir a Ofertas'}
          onPress={() =>
            onGoogleButtonPress()
              .then(() => navigation.navigate('Offer'))
              .catch(err => console.log('error', err))
          }
        />
        <Button
          title={'Ir a Registro'}
          onPress={() =>
            onGoogleButtonPress()
              .then(() => navigation.navigate('Registro'))
              .catch(err => console.log('error', err))
          }
        />
        <Button title={'Cerrar Sesion'} onPress={singOutGoogle} />
      </View>
    </>
  );
}
