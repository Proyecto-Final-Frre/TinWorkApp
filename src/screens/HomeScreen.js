import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {findAll} from '../services/AbilityService';
import {findAllCategories} from '../services/CategoryService';
import {useNavigation} from '@react-navigation/native';

const abilities = () => {
  const abilties = findAll();

  console.log('abilities', abilties);
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
