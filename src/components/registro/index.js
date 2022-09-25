import {Button, Input} from '@rneui/base';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Registro() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../images/tinwork-logo.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.form}>
        <Input
          placeholder="Nombre"
          containerStyle={styles.input}
          onChange={e => onChange(e, 'nombre')}
        />
        <Input
          placeholder="Apellido"
          containerStyle={styles.input}
          onChange={e => onChange(e, 'apellido')}
        />
        <Input
          placeholder="Correo"
          containerStyle={styles.input}
          onChange={e => onChange(e, 'correo')}
          keyboardType="email-address"
        />
        <Input
          placeholder="Contraseña"
          containerStyle={styles.input}
          password={true}
          secureTextEntry={!showPassword}
          onChange={e => onChange(e, 'password')}
          rightIcon={
            <Icon
              name={showPassword ? 'eyeo' : 'eye'}
              size={22}
              style={styles.ojo}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Input
          placeholder="Repetir contraseña"
          containerStyle={styles.input}
          password={true}
          secureTextEntry={!showPassword}
          onChange={e => onChange(e, 'confirm')}
          rightIcon={
            <Icon
              name={showPassword ? 'eyeo' : 'eye'}
              size={22}
              style={styles.ojo}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Button
          title={'Registrate'}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => console.log(formData)}
        />
      </View>
      <View style={styles.login}>
        <Text>
          Ya tienes una cuenta?{'  '}
          <Text style={styles.btnLogin}>Iniciar sesion</Text>
        </Text>
      </View>
    </>
  );
}

const defaultFormValues = () => {
  return {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    confirm: '',
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: '60%',
    marginBottom: 20,
  },
  form: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '95%',
  },
  btnContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  login: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  btnLogin: {
    color: colors.tinworkBlue,
    fontWeight: 'bold',
  },
  ojo: {
    color: '#c1c1c1',
  },
});
