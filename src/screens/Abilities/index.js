import React from 'react';
import {ScrollView} from 'react-native';
import {Form} from '../../components';
import { BACKGROUND } from '../../utils/constants';

const Aptitudes = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor:BACKGROUND.secondary}}> 
      <Form navigation={navigation} />
    </ScrollView>
  );
};

export default Aptitudes;
