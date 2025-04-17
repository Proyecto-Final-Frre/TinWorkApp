import {Button, Input} from '@rneui/base';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {size} from 'lodash';
import {showMessage} from 'react-native-flash-message';

import {validateEmail} from '../../utils/helpers';
import {colors} from '../../constants/colors';
import {createUser} from '../../services/UserService';
import { BACKGROUND } from '../../utils/constants';

export default function Registro({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorContrasena, setErrorContrasena] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);  

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const registerUser = async () => {
    if (!validateData()) {
      return;
    }
    setIsLoading(true)
    const user = {
      name: `${formData.nombre} ${formData.apellido}`,
      email: formData.correo,
      pass: formData.password,
    };

    try {
      const userSaved = await createUser(user);
      if (userSaved) {
        navigation.navigate('Habilidades');
      }
    } catch (error) {
      console.log("🚀 ~ registerUser ~ error:", error)
      showMessage({
        message:
          error.code === 'auth/email-already-in-use'
            ? 'Ya existe un usuario con ese mail. Pruebe iniciando sesion'
            : 'Ups, hubo un error. Intente nuevamente',
        type: 'danger',
      });
    }
    finally {
      setIsLoading(false); 
    }
  };

  const validateData = () => {
    setErrorNombre('');
    setErrorApellido('');
    setErrorCorreo('');
    setErrorContrasena('');
    setErrorConfirm('');
    let isValid = true;

    if (!validateEmail(formData.correo)) {
      setErrorCorreo('Debes ingresar un correo válido');
      isValid = false;
    }

    if (size(formData.nombre) < 3) {
      setErrorNombre('Debes ingresar un nombre de al menos 3 caracteres');
      isValid = false;
    }

    if (size(formData.apellido) < 3) {
      setErrorApellido('Debes ingresar un apellido de al menos 3 caracteres');
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorContrasena(
        'Debes ingresar una contraseña de al menos 6 caracteres',
      );
      isValid = false;
    }

    if (size(formData.confirm < 6)) {
      setErrorConfirm(
        'Debes ingresar una confirmacion de contraseña de al menos 6 caracteres',
      );
      isValid = false;
    }

    if (formData.confirm !== formData.password) {
      setErrorContrasena('La contraseña y la confirmación deben ser iguales');
      setErrorConfirm('La contraseña y la confirmación deben ser iguales');
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.registerContainer} >
       <View style={styles.imageContainer}>
        <Image
          source={require('../../images/logo_tinwork.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>   
      <Text style={styles.welcomeText}>
        Descubrí ofertas laborales 💼 hechas para vos 💫
      </Text>

      <View style={styles.form}>
  
      
              <Input
                placeholder="Nombre"
                containerStyle={styles.input}
                onChange={(e) => onChange(e, "nombre")}
                defaultValue={formData.nombre}
                leftIcon={{ type: "font-awesome", name: "user", color: "#ccc", size: 18 }}
                selectionColor={colors.tinworkBlue}  
                autoCapitalize="words"
                returnKeyType="next"
                blurOnSubmit={false}
                
              />
        <Input
          placeholder="Apellido"
          containerStyle={styles.input}
          onChange={e => onChange(e, 'apellido')}
          errorMessage={errorApellido}
          defaultValue={formData.apellido}
          leftIcon={{ type: "font-awesome", name: "user", color: "#ccc", size: 18 }}
          selectionColor={colors.tinworkBlue}  

        />
        <Input
          placeholder="Correo electrónico"
          containerStyle={styles.input}
          onChange={e => onChange(e, 'correo')}
          //keyboardType="email-address"
          selectionColor={colors.tinworkBlue}
          errorMessage={errorCorreo}
          defaultValue={formData.correo}
          leftIcon={{ type: "font-awesome", name: "envelope", color: "#ccc", size: 16 }}

        />
       
        <Input
          placeholder="Contraseña"
          containerStyle={styles.input}
          password={true}
          secureTextEntry={!showPassword}
          onChange={e => onChange(e, 'password')}
          leftIcon={{ type: "font-awesome", name: "lock", color: "#ccc", size: 18 }}
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
          selectionColor={colors.tinworkBlue}

        />
        <Input
          placeholder="Repetir contraseña"
          containerStyle={styles.input}
          password={true}
          secureTextEntry={!showPassword}
          onChange={e => onChange(e, 'confirm')}
          leftIcon={{ type: "font-awesome", name: "lock", color: "#ccc", size: 18 }}
          rightIcon={
            <Icon
              name={showPassword ? 'eyeo' : 'eye'}
              size={22}
              style={styles.ojo}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          errorMessage={errorConfirm}
          defaultValue={formData.confirm}
          selectionColor={colors.tinworkBlue}

        />
        <Button
          title={isLoading  ? (
            <ActivityIndicator color="#fff" />
          ): 'Registrate'}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={() => registerUser()}
        />
      </View>
         <View style={styles.loginFooter}>
            <Text style={styles.registerText}>
            ¿Ya tienes una cuenta?{"  "}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnLogin}>Iniciar sesión</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </View>
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
  registerContainer:{
      flex:1,
      paddingHorizontal: 8,
    },
    welcomeText: {
      fontSize: 14,
      textAlign: 'center',
      color: colors.tinworkBlack, 
    },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: '60%',
  }, 
  image_2: {
    height: 100, 
    width: "90%",
    marginTop: 2, 
  },
  form: {
    marginTop: 25,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '95%',
  },
  btnContainer: {
    marginTop:10,
    width: '90%',
    alignSelf: 'center',
  },
   btn:{
    backgroundColor:colors.tinworkBlue
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
    color: '#9e9e9e',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  formSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
    textAlign: 'left',
  },
  loginFooter: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',

  },
  registerText:{
    fontSize: 16,
    color:colors.tinworkBlack
  },
});
