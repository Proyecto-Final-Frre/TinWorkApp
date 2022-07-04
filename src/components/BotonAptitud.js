import * as React from 'react';
import {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  SectionList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Colors} from './colors';

const TYPES = ['blanco', 'azul'];

export default function BotonAptitud({children, onPress, label}) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(current => !current),
      isActive
        ? alert('Se ha quitado la habilidad')
        : alert('Se ha agregado la habilidad');
  };

  const btnStyle = StyleSheet.create({
    button: {
      //height: 40,
      //width: 130,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: isActive ? Colors.tinworkAzul : 'black',
      paddingHorizontal: 15,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isActive ? Colors.tinworkAzul : Colors.tinworkBlanco,
    },
    buttonText: {
      color: isActive ? 'white' : 'black',
    },
  });

  return (
    <TouchableOpacity style={btnStyle.button} onPress={handleClick}>
      <Text style={btnStyle.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}
