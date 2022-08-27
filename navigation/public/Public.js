import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import HomeScreen from '../../src/screens/HomeScreen';
import Aptitudes from '../../src/screens/Aptitudes'

const StackPublic = createNativeStackNavigator();

export default function Public() {
  return (
    <StackPublic.Navigator
      initialRouteName="Home"
      //screenOptions={themeApp[modo].fondoBarra}
    >
      <StackPublic.Screen
        name="Home"
        component={HomeScreen}
        // options={{headerShown: false}}
      />
      <StackPublic.Screen
        name="Aptitudes"
        component={Aptitudes}
        // options={{headerShown: false}}
      />
    </StackPublic.Navigator>
  );
}
