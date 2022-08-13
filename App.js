import React from 'react';
import Navigation from './Navigation';
import {View} from 'react-native';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Navigation />
      <FlashMessage position="top" />
    </View>
  );
}
