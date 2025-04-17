import React, { useState, useEffect, useCallback } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import { Card } from '@rneui/themed';
import storage from '@react-native-firebase/storage';
import { findUserAuthenticated } from '../../../AuthService';
import { findByUid, updateUser } from '../../services/UserService';
import AptitudeOffer from '../aptitudeOffer';
import ButtonMoreAbilities from '../buttonMoreAbilities';
import { styles } from './styles';
import { todasProvincias } from '../../services/ProvinceService';
import * as ImagePicker from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconCameraPlus from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from "react-native-svg";
import DescriptionProfile from '../descriptionProfile';
import SkeletonProfile from '../SkeletonProfile';
import { useFocusEffect } from '@react-navigation/core';

export default function Profile({ navigation }) {
  const [userAuth, setUserAuth] = useState();
  const [expandAptitude, setExpandAptitude] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [userDescription, setUserDescription] = useState();
  const [modalUbiVisible, setModalUbiVisible] = useState(false);
  const [searchText, setSearchText] = useState("")
  const [image, setImage] = useState(
    userAuth
      ? userAuth.imageProfile
      : { uri: 'https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png' },
  );

  const [loading, setLoading] = useState(true);  
  
 
  // Usamos useFocusEffect para ejecutar el código cuando la pantalla se enfoque
  useFocusEffect(
    useCallback(() => {
      const getAbilitiesByUidUser = async () => {
        setLoading(true);
        try {
          let userAuthenticated = await findUserAuthenticated();
          let user = await findByUid(userAuthenticated.uid);
          setUserAuth(user);
        } catch (error) {
          console.error("Error cargando usuario:", error);
        }
        setLoading(false);
      };

      // Llamamos la función cuando se enfoca la pantalla
      getAbilitiesByUidUser();

      // Esta función es opcional, se ejecuta cuando la pantalla pierde el foco
      return () => {
        console.log("La pantalla ha perdido el foco");
      };
    }, [])  // La dependencia vacía asegura que se ejecute solo una vez por foco
  );

  const findAllProvinces = async () => {
    const prov = await todasProvincias();
    setProvincias(prov);
  };

  useEffect(() => {
    findAllProvinces();
  }, []);


  useEffect(() => {
    console.log("🚀 ~ Profile ~ userAuth:", userAuth?.abilities)
    if (userAuth?.imageProfile) {
      setImage({ uri: userAuth?.imageProfile });
    } 
    
    setUserDescription(userAuth?.description)

    if (userAuth?.location) {
      setSelectedLocation({ name: userAuth?.location?.name , id:userAuth?.location?.id })
    }



  }, [userAuth]);


  const aceptUbication = () => {
    setModalUbiVisible(false)
    updateProvince()
  }

  const uploadImage = async (uri) => {
    if (!uri) return;

    try {
      const filename = `profile_${Date.now()}.jpg`;

      // Convertir imagen en blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Subir a Firebase Storage
      const ref = storage().ref(`/profiles/${filename}`);
      await ref.put(blob);

      // Obtener URL de descarga
      const url = await ref.getDownloadURL();

      // Actualizar usuario con la imagen
      const user = {
        uid: uid,
        imageProfile: url,
      };

      await updateUser(user);
      console.log("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error en uploadImage:", error);
    }
  };

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

  const handleImagePicker = async (sourceType) => {
    try {
      const result =
        sourceType === "camera"
          ? await ImagePicker.launchCamera({
            mediaType: "photo",
            saveToPhotos: false,
            cameraType: "front",
            quality: 1,
          })
          : await ImagePicker.launchImageLibrary({
            mediaType: "photo",
            quality: 1,
          });

      if (result.didCancel) {
        console.log("Se canceló la carga de imagen");
        return null;
      }

      if (result.errorCode) {
        console.log("Error: ", result.errorMessage);
        return null;
      }

      if (result?.assets) {
        let source = { uri: result.assets[0].uri };
        setImage(source);
        return source.uri; // Retorna la URI de la imagen
      }
    } catch (error) {
      console.error("Error en handleImagePicker:", error);
      return null;
    }
  };

  const pickImage = async () => {
    const uri = await handleImagePicker("gallery");
    await uploadImage(uri);
  };

  const pickImageCamera = async () => {
    const uri = await handleImagePicker("camera");
    await uploadImage(uri);
  };



  const updateProvince = () => {
    const user = {
      uid: uid,
      location: {name:selectedLocation?.name , id:selectedLocation?.id}
    }
    updateUser(user);

  }


  const uid = userAuth?.uid;
  let minAbilities = userAuth?.abilities?.length - 5;
  const radius = 60;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;

  const calculateMade = () => {
    let completedFields = 0;
    if (image) completedFields++;
    if (selectedLocation?.name) completedFields++;
    if (userAuth?.name) completedFields++;
    if (userAuth?.email) completedFields++;
    if (userDescription) completedFields++;
    const progressPercentage = (completedFields / 5) * 100;
    return progressPercentage
  }

  const progress = calculateMade()

  const handleSelectLocation = (provincia) => {
    setSelectedLocation({ name: provincia.nombre + ", Argentina", id: provincia.id });
  };

  const filteredProvinces = provincias.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );  

  const reloadProfile = async () => {
    setLoading(true);
    try {
      let userAuthenticated = await findUserAuthenticated();
      let user = await findByUid(userAuthenticated.uid);
      setUserAuth(user);
    } catch (error) {
      console.error("Error recargando perfil:", error);
    }
    setLoading(false); 
  };

  const closeModal=()=>{
    setModalUbiVisible(false), 
    setSelectedLocation({ name: userAuth?.location?.name , id:userAuth?.location?.id })
  }
  
  return (
    <View>            
       <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={reloadProfile} />}                        > 
      {loading  ? (  
        <SkeletonProfile />
      ) : ( <>      
      <Card containerStyle={styles.card}>
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'space-between' }}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {/* Círculo de progreso */}
              <Svg height={radius * 2 + strokeWidth * 2} width={radius * 2 + strokeWidth * 2} style={styles.progressCircle}>
                {/* Fondo gris del círculo */}
                <Circle
                  cx={radius + strokeWidth}
                  cy={radius + strokeWidth}
                  r={radius}
                  stroke="#ccc"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                {/* Progreso dinámico */}
                <Circle
                  cx={radius + strokeWidth}
                  cy={radius + strokeWidth}
                  r={radius}
                  stroke="#000"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress / 100)}
                  strokeLinecap="round"
                  fill="none"
                  transform={`rotate(90, ${radius + strokeWidth}, ${radius + strokeWidth})`} // ✅ Rota el inicio a 135°

                />
              </Svg>

              {/* Imagen de perfil */}
              <Pressable onPress={handleImageUser} style={styles.imageWrapper}>
                <ImageBackground style={styles.img} source={image}>
                </ImageBackground>                
              </Pressable>           
              <Pressable onPress={handleImageUser}   style={styles.uploadIconContainer}>
                <IconCameraPlus name="camera-plus" size={30} color={"black"} />
              </Pressable>
              {/* Indicador de porcentaje */}
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>{progress}%</Text>
              </View>
            </View>

            <View style={styles.locationContainer}>
              <Text style={styles.title}>{userAuth?.name || ''}</Text>
              <Text style={styles.subtitle}>{userAuth?.email || ''}</Text>
              <View style={styles.ubicationContainer}>
                <Text style={styles.title}>Ubicación </Text>
                <TouchableOpacity style={[styles.changeLocationButton, { marginRight: "6%" }]} onPress={() => setModalUbiVisible(true)}>
                  <Text style={[styles.changeLocationText]}> Editar</Text>
                </TouchableOpacity>
              </View >
              <View>
                {selectedLocation?.name ?
                  <Text style={styles.subtitle}>{selectedLocation?.name}</Text> : <Text style={styles.ubi}> Selecciona tu ubicación</Text>}
              </View>
            </View>
          </View>
          <View style={styles.abilitiesContainer}>
            <View style={styles.abilityHeader}>
              <Text style={styles.title}>Habilidades</Text>
              <TouchableOpacity style={styles.changeLocationButton} onPress={() => navigation.navigate('Habilidades')}>
                <Text style={styles.changeLocationText}> Editar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              {userAuth?.abilities?.slice(0, 5).map((ability, index) => (
                <AptitudeOffer title={ability} key={index} />
              ))}
              {!expandAptitude
                ? userAuth?.abilities?.length > minAbilities && (
                  <ButtonMoreAbilities
                    buttonStyle={true}
                    titleStyle={true}
                    title={/*`+${minAbilities}`*/"Ver más"}
                    onPress={() => setExpandAptitude(true)}
                  />
                )
                : userAuth?.abilities
                  .slice(5, userAuth?.abilities?.length)
                  .map((ability, index) => (
                    <AptitudeOffer title={ability} key={index} />
                  ))}
              {expandAptitude && (
                <ButtonMoreAbilities
                  buttonStyle={true}
                  titleStyle={true}
                  title={`Ver Menos`}
                  onPress={() => setExpandAptitude(false)}
                />
              )}
            </View>
          </View>
          <DescriptionProfile userUid={userAuth?.uid} userDescription={userAuth?.description}/>       
           {/*Modal para seleccionar la provincia*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalUbiVisible}
            onRequestClose={() => closeModal()}
          >
            <View style={styles.modalContainer}>

              <View style={styles.modalContent}>
                <View style={styles.modalTitle}>
                  <Text style={styles.title}>Seleccione su ubicación</Text>
                  <TouchableOpacity style={styles.closeIcon} onPress={() => closeModal()}>
                    <MaterialIcons name="close" size={30} color="#333" />
                  </TouchableOpacity>
                </View>


                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar provincia..."
                  placeholderTextColor="#888"
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <FlatList
                  data={[...filteredProvinces].sort((a, b) => a.nombre.localeCompare(b.nombre))}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (

                    <TouchableOpacity
                      style={[
                        styles.locationItem,
                        selectedLocation?.id === item.id && styles.locationItemSelected
                      ]}
                      onPress={() => handleSelectLocation(item)}
                    >
                      {selectedLocation?.id === item.id ?
                        <MaterialIcons name="radio-button-checked" size={20} color="#4A90E2" /> : <MaterialIcons name="radio-button-unchecked" size={20} color="#4A90E2" />}
                      <Text
                        style={[
                          styles.locationItemText,
                          selectedLocation?.id === item.id && styles.locationItemTextSelected
                        ]}
                      >
                        {item.nombre}
                      </Text>


                    </TouchableOpacity>


                  )}
                />

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => aceptUbication()}
                >
                  <Text style={styles.closeButtonText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
      </Card>
    </>) }
     </ScrollView> 
    </View>
  );
}
