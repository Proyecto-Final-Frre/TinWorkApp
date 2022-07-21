import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {authenticationWithGoogle} from '../../AuthService';
import {findAll} from '../services/AbilityService';
import {findAllCategories} from '../services/CategoryService';
import {useNavigation} from '@react-navigation/native';

async function onGoogleButtonPress() {
  const auth = await authenticationWithGoogle();
  console.log('autenticado', auth);
}

const abilities = () => {
  findAll();
};

const categories = () => {
  findAllCategories();
};

export default function HomeScreen() {
  const navigation = useNavigation();
  useEffect(() => abilities(), []);
  useEffect(() => categories(), []);

  return (
    <>
      <View>
        <Text onPress={navigation.navigate('Aptitudes')}>Hola Mundo</Text>
      </View>
    </>
  );
}
