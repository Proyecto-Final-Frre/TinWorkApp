import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {authenticationWithGoogle} from '../../AuthService';
import {findAll} from '../services/AbilityService';

async function onGoogleButtonPress() {
  const auth = await authenticationWithGoogle();
  console.log('autenticado', auth);
}

const abilities = () => {
  findAll();
};

export default function HomeScreen() {
  useEffect(() => abilities(), []);

  return (
    <>
      <View>
        <Text>Hola Mundo</Text>
      </View>
    </>
  );
}
