import React from 'react';
import {ScrollView} from 'react-native';
import Registro from '../../components/registro';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { BACKGROUND } from '../../utils/constants';

const Registration = ({navigation}) => {
  return (
    <KeyboardAwareScrollView style={{backgroundColor:BACKGROUND.secondary}} >
      <Registro navigation={navigation} />
    </KeyboardAwareScrollView>
  );
};

export default Registration;
