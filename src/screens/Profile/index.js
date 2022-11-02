import React from 'react';
import {ScrollView} from 'react-native';
import Profile from '../../components/profile';

const Profiles = ({navigation}) => {
  return (
    <ScrollView>
      <Profile navigation={navigation} />
    </ScrollView>
  );
};

export default Profiles;
