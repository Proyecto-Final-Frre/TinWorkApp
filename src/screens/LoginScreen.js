import React from 'react';
import {View, Text} from 'react-native';
import {authenticationWithGoogle, singOutGoogle} from '../../AuthService';
import {Button} from '../components';

function onGoogleButtonPress() {
  return authenticationWithGoogle();
}

export default function LoginScreen({navigation}) {
  return (
    <>
      <View>
        <Button
          title={'Ingresar'}
          onPress={() =>
            onGoogleButtonPress()
              .then(() => navigation.navigate('Aptitudes'))
              .catch(err => console.log('error', err))
          }
        />
        <Button title={'Cerrar Sesion'} onPress={singOutGoogle} />
      </View>
    </>
  );
}
