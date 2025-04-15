import React from 'react';
import {Image,View,Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import HomeScreen from '../../src/screens/HomeScreen';
import AbilitiesScreen from '../../src/screens/Abilities';
import LoginScreen from '../../src/screens/Login';
import OffersScreen from '../../src/screens/OffersScreen';
import OfferScreen from '../../src/screens/Offers';
import Registration from '../../src/screens/Registration';
import Matchs from '../../src/screens/Matchs';
import ChatScreen from '../../src/screens/Chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../src/constants/colors';

const StackPublic = createNativeStackNavigator();

export default function Public() {
  return (
    <StackPublic.Navigator
      initialRouteName="Login"
      //screenOptions={themeApp[modo].fondoBarra}
    >
      <StackPublic.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <StackPublic.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'TinWork',
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <StackPublic.Screen
        name="Registro"
        component={Registration}
        options={{
          title: 'Registro',
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <StackPublic.Screen
        name="Matchs"
        component={Matchs}
        options={{
          title: 'Mis Matchs',
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <StackPublic.Screen
        name="Habilidades"
        component={AbilitiesScreen}
        options={{
          // headerLeft: () => (
          //   <Image
          //     style={{width: 55, height: 55, margin: 2}}
          //     source={require('../../src/images/CuatroDeCuatro.png')}
          //   />
          // ),
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="hammer-wrench" size={22} color={colors.tinworkBlue} />
              <Text style={{ marginLeft: 6, fontSize: 18, fontWeight: '600', color:colors.tinworkBlue}}>
                Habilidades
              </Text>
            </View>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#e5f1ff',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            elevation: 4, // sombra en Android
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
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
       <StackPublic.Screen
        name="Chat"
        component={ChatScreen}
        options={{        
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="chat" size={22} color={colors.tinworkBlue} />
              <Text style={{ marginLeft: 6, fontSize: 18, fontWeight: '600', color:colors.tinworkBlue}}>
                Chat
              </Text>
            </View>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#e5f1ff',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            elevation: 4, // sombra en Android
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }}
      />
      
    </StackPublic.Navigator>
  );
}
