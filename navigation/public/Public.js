import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import HomeScreen from '../../src/screens/HomeScreen';
import Aptitudes from '../../src/screens/Aptitudes';
import LoginScreen from '../../src/screens/LoginScreen';

const StackPublic = createNativeStackNavigator();

export default function Public() {
  return (
    <StackPublic.Navigator
      initialRouteName="Home"
      //screenOptions={themeApp[modo].fondoBarra}
    >
      <StackPublic.Screen
        name="Login"
        component={LoginScreen}
        // options={{headerShown: false}}
      />
      <StackPublic.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'TinWork', headerBackVisible: false}}
      />
      <StackPublic.Screen
        name="Aptitudes"
        component={Aptitudes}
        // options={{headerShown: false}}
      />
    </StackPublic.Navigator>
  );
}
