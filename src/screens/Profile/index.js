import React from 'react';
import {ScrollView} from 'react-native';
import Profile from '../../components/profile';

const Profiles = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1}}>
      <Profile navigation={navigation} />
    </ScrollView>
  );
};

export default Profiles;
