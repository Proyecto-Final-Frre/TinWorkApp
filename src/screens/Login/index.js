import React from 'react';
import {View, Text} from 'react-native';
import {authenticationWithGoogle, singOutGoogle} from '../../../AuthService';
import {Button} from '../../components';
import {findByUid, updateUser} from '../../services/UserService';
import messaging from '@react-native-firebase/messaging';

function onGoogleButtonPress() {
  return authenticationWithGoogle().then(response => {
    return findByUid(response.user.uid).then(async user => {
      const token = await messaging().getToken();

      return await updateUser({
        uid: user.uid,
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
        <Button title={'Cerrar Sesion'} onPress={singOutGoogle} />
      </View>
    </>
  );
}
