import React from 'react';
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
        // options={{headerShown: false}}
      />
      <StackPublic.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'TinWork', headerBackVisible: false}}
      />
      <StackPublic.Screen
        name="Habilidades"
        component={AbilitiesScreen}
        // options={{headerShown: false}}
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
