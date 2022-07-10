import React from 'react';
import {View} from 'react-native';
import {authenticationWithGoogle} from '../../AuthService';

async function onGoogleButtonPress() {
  const auth = await authenticationWithGoogle();
  console.log('autenticado', auth);
}

export default function HomeScreen() {

  return (
    <>
      <View>
        <Text>Hola Mundo</Text>
      </View>
    </>
  );
}
;
