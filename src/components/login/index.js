import {Button, Input} from '@rneui/base';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView, 
  TextInput  
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {size} from 'lodash';
import messaging from '@react-native-firebase/messaging';
import {validateEmail} from '../../utils/helpers';
import {colors} from '../../constants/colors';
import {updateUser} from '../../services/UserService';
import {authenticationWithEmailAndPass} from '../../../AuthService';
import { BACKGROUND, FUENTES } from '../../utils/constants';
import { showMessage } from 'react-native-flash-message';

export default function Login({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorContrasena, setErrorContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const onChange = (text, type) => {
    const newFormData = { ...formData, [type]: text };
    setFormData(newFormData);
  
    if (text.trim() === '') {
      // Limpia errores si está vacío
      if (type === 'correo') setErrorCorreo('');
      if (type === 'password') setErrorContrasena('');
      return;
    }
  
    if (type === 'correo') {
      setErrorCorreo(validateEmail(text) ? '' : 'Debes ingresar un correo válido');
    }
  
    if (type === 'password') {
      setErrorContrasena(text.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres');
    }
  };

  const loginUser = async () => {
    if (!validateData()) {
      return;
    }
    setIsLoading(true)
    try {
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

        navigation.navigate('Home');
      }
    } catch(err) { 
      if (err.code === 'auth/user-not-found') {
        showMessage({
          message: 'El usuario no existe',
          description: 'Verificá el correo ingresado o registrate.',
          type: 'danger',
          icon: 'auto',
        });
      } else if (err.code === 'auth/wrong-password') {
        showMessage({
          message: 'Contraseña incorrecta',
          description: 'Verificá la contraseña e intentá de nuevo.',
          type: 'danger',
          icon: 'auto',
        });
      } else {
        showMessage({
          message: 'Ocurrió un error al iniciar sesión',
          description: 'Intentá de nuevo más tarde.',
          type: 'danger',
          icon: 'auto',
        }); }
      
    } finally {
      setIsLoading(false)
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

<ScrollView
  style={{ backgroundColor: BACKGROUND.secondary }}
  // contentContainerStyle={{ flexGrow: 1 }}
  // keyboardShouldPersistTaps="handled"
>
  <View style={styles.loginContainer}>
      <View style={styles.imageContainer}>      
        <Image
          source={require('../../images/logo_tinwork.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.welcomeText}>Descubrí ofertas laborales 💼</Text>
         <Image
          source={require('../../images/Reclutier.png')}
          resizeMode="contain"
          style={styles.image_2}
        />
      </View>
      <View style={styles.form}>
  
       <Input
      placeholder="Ingresa tu correo"
      containerStyle={styles.input}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.inputText}
      selectionColor={colors.tinworkBlue}  
      onChangeText={text => onChange(text, 'correo')}      //keyboardType="email-address"
      errorMessage={errorCorreo}
      errorStyle={styles.errorText}
      defaultValue={formData.correo}
      leftIcon={{ type: 'material', name: 'email', color: '#9e9e9e', size: 20 }}
    /> 
      <Input
        placeholder="Ingresa tu contraseña"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        selectionColor={colors.tinworkBlue}  
        password={true}
        secureTextEntry={!showPassword}
        textContentType="password"
        // onChange={e => onChange(e, 'password')}
        onChangeText={text => onChange(text, 'password')}

        errorMessage={errorContrasena}
        errorStyle={styles.errorText}
        defaultValue={formData.password}
        leftIcon={{ type: 'material', name: 'lock', color: '#9e9e9e', size: 20 }}
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
          title={'Ingresar'}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          loading={isLoading}
          onPress={() => loginUser()}
        />
      </View>
      <View style={styles.loginFooter}>
      <Text style={styles.registerText}>
        ¿Todavía no estás registrado?{'  '}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.btnLogin}>Registrarse</Text>
        </TouchableWithoutFeedback>
      </Text>        
      </View>
  </View>
  </ScrollView>
   
  );
}

const defaultFormValues = () => {
  return {
    correo: '',
    password: '',
  };
};

const styles = StyleSheet.create({
  loginContainer:{
    flex:1,
    backgroundColor:BACKGROUND.secondary,
    paddingHorizontal: 20,
  
  },

  imageContainer: {
    alignItems: "center",
    marginTop: '1%', // Añadir espacio en la parte superior
    marginBottom:'1%', // Espacio entre las imágenes y el formulario
  },
  image: {
    height: 60, // Reducir un poco el tamaño para que se vea más proporcionado
    width: "60%",
  },
  welcomeText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333', // gris oscuro, sobrio y legible
    fontWeight: '400',
  },
  image_2: {
    height: 150, // Aumentar un poco para que la ilustración se vea mejor
    width: "80%",
    marginTop: 5, // Espacio entre las dos imágenes
  },
  form: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: "100%",
  },
  inputText: {
    fontSize:18,
    color: colors.tinworkBlack, // Color gris para el texto de input
    fontFamily:FUENTES.REGULAR
  },
  btnContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  loginFooter: {
    marginTop: '1%',
    marginBottom: 30,
    alignItems: 'center',
  },
  registerText:{
    fontSize: 16,
    color:colors.tinworkBlack
  },
  btn:{
    backgroundColor:colors.tinworkBlue
  },
  btnLogin: {
    color: colors.tinworkBlue,
    fontWeight: 'bold',
  },
  ojo: {
    color: '#9e9e9e',
  },

});
