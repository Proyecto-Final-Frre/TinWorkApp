import React from 'react';
import {ScrollView} from 'react-native';
import Registro from '../../components/registro';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Registration = () => {
  return (
    <KeyboardAwareScrollView>
      <Registro />
    </KeyboardAwareScrollView>
  );
};

export default Registration;
