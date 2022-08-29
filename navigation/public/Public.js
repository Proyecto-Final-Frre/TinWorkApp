import React from 'react';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import HomeScreen from '../../src/screens/HomeScreen';
import AbilitiesScreen from '../../src/screens/Abilities';
import LoginScreen from '../../src/screens/Login';
import OffersScreen from '../../src/screens/OffersScreen';
import OfferScreen from '../../src/screens/Offers';

const StackPublic = createNativeStackNavigator();

export default function Public() {
  return (
    <StackPublic.Navigator
      initialRouteName="Tinwork"
      //screenOptions={themeApp[modo].fondoBarra}
    >
      <StackPublic.Screen
        name="Tinwork"
        component={LoginScreen}
        options={{headerShown: true}}
      />
      <StackPublic.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'TinWork', headerBackVisible: false}}
      />
      <StackPublic.Screen
        name="Habilidades"
        component={AbilitiesScreen}
        options={{
          headerLeft: () => (
            <Image
              style={{width: 55, height: 55, margin: 2}}
              source={require('../../src/images/CuatroDeCuatro.png')}
            />
          ),
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <StackPublic.Screen
        name="Offers"
        component={OffersScreen}
        // options={{headerShown: false}}
      />
      <StackPublic.Screen
        name="Offer"
        component={OfferScreen}
        options={{headerShown: false}}
      />
    </StackPublic.Navigator>
  );
}
