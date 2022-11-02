import {Button, Input} from '@rneui/base';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {size} from 'lodash';
import messaging from '@react-native-firebase/messaging';
import {validateEmail} from '../../utils/helpers';
import {colors} from '../../constants/colors';
import {updateUser} from '../../services/UserService';
import {authenticationWithEmailAndPass, createUser} from '../../../AuthService';

export default function Login({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorContrasena, setErrorContrasena] = useState('');

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const loginUser = async () => {
    if (!validateData()) {
      return;
    }
    const auth = await authenticationWithEmailAndPass(
      formData.correo,
      formData.password,
    );
    const token = await messaging().getToken();
    if (auth) {
      await updateUser({
        uid: auth.user.uid,
        token: token,
      });
      navigation.navigate('Profile');
    }
  };

  const validateData = () => {
    setErrorCorreo('');
    setErrorContrasena('');
    let isValid = true;

    if (!validateEmail(formData.correo)) {
      setErrorCorreo('Debes ingresar un correo válido');
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorContrasena(
        'Debes ingresar una contraseña de al menos 6 caracteres',
      );
      isValid = false;
    }

    return isValid;
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
          placeholder="Correo"
          containerStyle={styles.input}
          onChange={e => onChange(e, 'correo')}
          keyboardType="email-address"
          errorMessage={errorCorreo}
          defaultValue={formData.correo}
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
          errorMessage={errorContrasena}
          defaultValue={formData.password}
        />
        <Button
          title={'Ingresar'}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => loginUser()}
        />
      </View>
      <View style={styles.login}>
        <Text>
          Todavia no estas registrado?{'  '}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.btnLogin}>Registrarse</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </>
  );
}

const defaultFormValues = () => {
  return {
    correo: '',
    password: '',
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
    marginTop: 50,
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
