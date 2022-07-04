import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Colors} from './colors';

const SIZES = ['small', 'medium', 'large'];
const TYPES = ['azul', 'blanco'];
const ROUNDED = ['small', 'medium', 'large'];

export default function BotonAptitud({
  children,
  onPress,
  type,
  size,
  label,
  rounded,
}) {
  const btnSize = SIZES.includes(size) ? size : 'small';
  const btnType = TYPES.includes(type) ? type : 'blanco';
  const btnRound = ROUNDED.includes(rounded) ? rounded : 'large';

  const btnStyle = {
    height: 40,
    //width: btnSize,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tinworkBlanco,
  };

  return (
    <TouchableOpacity style={btnStyle}>
      <Text style={{color: '#000', fontSize: 16}}>Hello Button</Text>
    </TouchableOpacity>
  );
}
