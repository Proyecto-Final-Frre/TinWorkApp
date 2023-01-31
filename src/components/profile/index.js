import React, {useState, useEffect, useCallback} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import {Card} from '@rneui/themed';
import {showMessage} from 'react-native-flash-message';
import storage from '@react-native-firebase/storage';
import {Picker} from '@react-native-picker/picker';
import {firebase} from '@react-native-firebase/auth';
import {findUserAuthenticated} from '../../../AuthService';
import {findByUid, updateUser} from '../../services/UserService';
import AptitudeOffer from '../aptitudeOffer';
import ButtonMoreAbilities from '../buttonMoreAbilities';
import {styles} from './styles';
import FormSubmitButton from '../form-submit-button';
import {todasProvincias} from '../../services/ProvinceService';
import * as ImagePicker from 'react-native-image-picker';

export default function Profile({navigation}) {
  const [userAuth, setUserAuth] = useState();
  const [expandAptitude, setExpandAptitude] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState();
  const [userDescription, setUserDescription] = useState();
  //Subida de img
  const [filename, setFilename] = useState();
  const [image, setImage] = useState(
    userAuth
      ? userAuth.imageProfile
      : {uri: 'https://reactnative.dev/img/tiny_logo.png'},
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (userAuth?.imageProfile) {
      setImage({uri: userAuth?.imageProfile});
    }
    if (userAuth?.description) {
      setUserDescription(userAuth?.description);
    }
  }, [userAuth]);

  const handleImageUser = () => {
    Alert.alert(
      'Seleccione',
      'Seleccione de donde quiere obtener la foto de perfil',
      [
        {
          text: 'Galeria',
          onPress: () => pickImage(),
          style: 'default',
        },
        {
          text: 'Cámara',
          onPress: () => pickImageCamera(),
          style: 'default',
        },
        {
          cancelable: true,
          text: 'Cancelar',
          onDismiss: () => console.log('tratar despues...'),
        },
      ],
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) {
      console.log('Se canceló la carga de imagen');
    } else if (result.errorCode) {
      console.log('Error: ', result.errorMessage);
    } else if (result?.assets) {
      let source = {uri: result.assets[0].uri};
      console.log(result.assets);
      setFilename(result.assets[0].fileName);
      setImage(source);
    }
  };

  const pickImageCamera = async () => {
    const result = await ImagePicker.launchCamera({
      mediaType: 'photo',
      saveToPhotos: false,
      cameraType: 'front',
      quality: 1,
    });

    if (result.didCancel) {
      console.log('Se canceló la carga de imagen');
    } else if (result.errorCode) {
      console.log('Error: ', result.errorMessage);
    } else if (result?.assets) {
      let source = {uri: result.assets[0].uri};
      setImage(source);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
    var ref = firebase.storage().ref('/perfil').child(filename).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    const url = await storage()
      .ref('perfil/' + filename)
      .getDownloadURL();
    onSubmit(url);
  };

  useEffect(() => {
    const getAbilitiesByUidUser = async () => {
      let userAuthenticated = await findUserAuthenticated();
      let user = await findByUid(userAuthenticated.uid);
      setUserAuth(user);
    };
    getAbilitiesByUidUser();
  }, []);

  const findAllProvinces = async () => {
    const prov = await todasProvincias();
    setProvincias(prov);
  };

  useEffect(() => {
    findAllProvinces();
  }, []);

  const onSubmit = useCallback(
    url => {
      const user = {
        uid: uid,
        location: selectedProvince + ', Argentina',
        description: userDescription,
        imageProfile: url,
      };
      updateUser(user);
      showMessage({
        message: 'Usuario Actualizado',
        type: 'success',
      });
    },
    [selectedProvince, image, userDescription],
  );

  let uid = userAuth?.uid;

  let minAbilities = userAuth?.abilities.length - 5;

  return (
    <View>
      <Text style={{fontSize: 35, padding: 20}}>Mi Perfil</Text>
      <Card>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignContent: 'space-around',
          }}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Pressable onPress={handleImageUser}>
                <ImageBackground style={styles.img} source={image}>
                  <Text style={styles.textoImagen}>Cambiar Foto</Text>
                </ImageBackground>
              </Pressable>
            </View>
            <View style={styles.locationContainer}>
              <View style={styles.tituloyBoton}>
                <Text style={styles.titulos}>Ubicación</Text>
              </View>
              <Picker
                selectedValue={selectedProvince}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedProvince(itemValue)
                }>
                {provincias.map(provincia => (
                  <Picker.Item
                    key={provincia?.id}
                    label={`${provincia?.nombre}`}
                    value={`${provincia?.nombre}`}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.datosContainer}>
            <Text style={styles.titulos}>Nombre Completo</Text>
            <Text style={styles.datos}>{userAuth?.name || ''}</Text>
            <Text style={styles.titulos}>E-Mail</Text>
            <Text style={styles.datos}>{userAuth?.email || ''}</Text>
          </View>
          <View style={styles.abilitiesContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.titulos}>Habilidades</Text>
              <Text
                style={{
                  color: '#2E81FB',
                }}
                onPress={() => navigation.navigate('Habilidades')}>
                Editar
              </Text>
            </View>
            <View style={styles.datos}>
              <View style={styles.buttonsContainer}>
                {userAuth?.abilities.slice(0, 5).map((ability, index) => (
                  <AptitudeOffer title={ability} key={index} />
                ))}
                {!expandAptitude
                  ? userAuth?.abilities.length > minAbilities && (
                      <ButtonMoreAbilities
                        buttonStyle={false}
                        titleStyle={false}
                        title={`+${minAbilities}`}
                        onPress={() => setExpandAptitude(true)}
                      />
                    )
                  : userAuth?.abilities
                      .slice(5, userAuth?.abilities.length)
                      .map((ability, index) => (
                        <AptitudeOffer title={ability} key={index} />
                      ))}
                {expandAptitude && (
                  <ButtonMoreAbilities
                    buttonStyle={false}
                    titleStyle={false}
                    title={`Ver Menos`}
                    onPress={() => setExpandAptitude(false)}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.tituloyBoton}>
              <Text style={styles.titulos}>Descripción</Text>
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={setUserDescription}
              value={userDescription}
            />
          </View>
        </View>
      </Card>
      <FormSubmitButton title={`Aplicar Cambios`} onSubmit={uploadImage} />
    </View>
  );
}
