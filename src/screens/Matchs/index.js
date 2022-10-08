import React from 'react';
import {ScrollView} from 'react-native';
import {Form} from '../../components';

const Matchs = ({navigation}) => {
  return (
    <ScrollView>
      <Form navigation={navigation} />
    </ScrollView>
  );
};

export default Matchs;