import React from 'react';
import {ScrollView} from 'react-native';
import Match from '../../components/match';

const Matchs = ({navigation}) => {
  return (
    <ScrollView>
      <Match navigation={navigation} />
    </ScrollView>
  );
};

export default Matchs;
