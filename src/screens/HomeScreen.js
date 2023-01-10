import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OfferScreen from './Offers';
import AbilitiesScreen from './Abilities';
import {Image} from 'react-native';
import Profiles from './Profile';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          tabBarLabel: 'Ofertas',
          headerBackVisible: false,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                resizeMode={'contain'}
                source={require('./home_ico.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profiles}
        options={{
          tabBarLabel: 'Perfil',
          headerBackVisible: false,
          headerShown: false,
          tabBarIcon: ({}) => {
            return (
              <Image
                resizeMode={'contain'}
                source={require('./perfil_ico.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
