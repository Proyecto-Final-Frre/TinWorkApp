import React from 'react';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import HomeScreen from '../../src/screens/HomeScreen';
import Aptitudes from '../../src/screens/Aptitudes';
import LoginScreen from '../../src/screens/LoginScreen';

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
        options={{title: 'TinWork', headerBackVisible: false}}
      />
      <StackPublic.Screen
        name="Aptitudes"
        component={Aptitudes}
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
    </StackPublic.Navigator>
  );
}
