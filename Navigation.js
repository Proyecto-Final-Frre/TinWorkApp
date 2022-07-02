import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Public from './navigation/public/Public';
export default function Navigation() {
  const auths = {token: false};
  return (
    <NavigationContainer>
      {!auths.token ? <Public /> : <Public />}
    </NavigationContainer>
  );
}
