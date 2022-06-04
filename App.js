import React from 'react';
import {Text, Button} from 'react-native';
import {authenticationWithGoogle} from './AuthService';

async function onGoogleButtonPress() {
  const auth = await authenticationWithGoogle();
  console.log('autenticado', auth);
}

function App() {
  return (
    <>
      <Text>Hola mundo</Text>
      <Text>Hola mundo</Text>
      <Button title="Google Sign-In" onPress={() => onGoogleButtonPress()} />
    </>
  );
}

export default App;
