import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {authenticationWithGoogle} from '../../AuthService';
import BotonAptitud from '../components/BotonAptitud';

async function onGoogleButtonPress() {
  const auth = await authenticationWithGoogle();
  console.log('autenticado', auth);
}

export default function HomeScreen() {
  return (
    <>
      <Text>Hola mundo</Text>
      <Text>Hola mundo</Text>
      <View style={styles.container}>
        <BotonAptitud label={'JavaScript'} />
      </View>
      <Button title="Google Sign-In" onPress={() => onGoogleButtonPress()} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
