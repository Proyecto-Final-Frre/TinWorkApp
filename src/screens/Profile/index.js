import React from 'react';
import {ScrollView} from 'react-native';
import Profile from '../../components/profile';
import { BACKGROUND } from '../../utils/constants';

const Profiles = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1,backgroundColor:BACKGROUND.secondary}}>
      <Profile navigation={navigation} />
    </ScrollView>
  );
};

export default Profiles;
