import React from 'react';
import {Button, withTheme} from '@rneui/themed';
import {Colors} from '../components/colors';

const ButtonAceptar = ({onPress}) => {
  return (
    <Button
      title="Aceptar"
      buttonStyle={{
        backgroundColor: Colors.tinworkAzul,
        borderRadius: 2,
        borderColor: Colors.tinworkAzul,
        borderWidth: 1,
      }}
      titleStyle={{
        color: Colors.tinworkBlanco,
        fontSize: 14,
        fontFamily: '',
      }}
      containerStyle={{
        width: '100%',
        height: 40,
        marginVertical: 10,
      }}
      onPress={onPress}
    />
  );
};

export default withTheme(ButtonAceptar, '');
