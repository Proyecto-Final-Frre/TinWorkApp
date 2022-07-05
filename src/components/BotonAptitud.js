import React from 'react';
import {Button, withTheme} from '@rneui/themed';
import {Colors} from '../components/colors';

const BotonAptitud = ({title, isActive, onPress}) => {
  return (
    <Button
      title={title}
      buttonStyle={{
        backgroundColor: isActive ? Colors.tinworkAzul : Colors.tinworkBlanco,
        borderRadius: 18,
        borderColor: isActive ? Colors.tinworkAzul : 'black',
        borderWidth: 1,
        paddingHorizontal: 20,
      }}
      titleStyle={{
        color: isActive ? Colors.tinworkBlanco : 'black',
        fontSize: 14,
        fontFamily: '',
      }}
      containerStyle={{
        marginHorizontal: 5,
        height: 40,
        marginVertical: 10,
      }}
      onPress={onPress}
    />
  );
};

export default withTheme(BotonAptitud, '');
