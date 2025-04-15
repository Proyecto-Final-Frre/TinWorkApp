import React from 'react';
import {ScrollView} from 'react-native';
import Document from '../../components/document';
import { BACKGROUND } from '../../utils/constants';

const Documents = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1,backgroundColor:BACKGROUND.secondary}}>
      <Document navigation={navigation} />
    </ScrollView>
  );
};

export default Documents;
