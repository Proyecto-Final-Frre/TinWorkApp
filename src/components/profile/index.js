import React, { useState, useEffect, useCallback } from 'react';
import {
  ImageBackground,
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity
} from 'react-native';
import { Card } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '@react-native-firebase/auth';
import { findUserAuthenticated } from '../../../AuthService';
import { findByUid, removeCertification, updateUser } from '../../services/UserService';
import AptitudeOffer from '../aptitudeOffer';
import ButtonMoreAbilities from '../buttonMoreAbilities';
import { styles } from './styles';
import { todasProvincias } from '../../services/ProvinceService';
import * as ImagePicker from 'react-native-image-picker';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util'
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconCameraPlus from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Path, Circle } from "react-native-svg";
import { TbCameraPlus } from "react-icons/tb";

export default function Profile({ navigation }) {
  const [userAuth, setUserAuth] = useState();
  const [expandAptitude, setExpandAptitude] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [userDescription, setUserDescription] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadingCertification, setUploadingCertification] = useState(false);
  const [modalUbiVisible, setModalUbiVisible] = useState(false);
  const [searchText, setSearchText] = useState("")
  const [filename, setFilename] = useState();
  const [image, setImage] = useState(
    userAuth
      ? userAuth.imageProfile
      : { uri: 'https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png' },
  );

  const [cvFile, setCvFile] = useState(null); // Estado para el CV
  const [cvName, setCvName] = useState(''); // Estado para el nombre del CV
  const [cvUrl, setCvUrl] = useState(null);  // Estado para la URL del CV (PDF)
  const [certifications, setCertifications] = useState([]);
  const [dataCertifications, setDataCertifications] = useState([])
  const [description, setDescription] = useState('');

  // Método para seleccionar y subir una certificación
  const handleCertificationPicker = async () => {
    setUploadingCertification(true)
    try {

      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      const uri = result?.assets[0]?.uri;
      const filename = `certification_${Date.now()}`;
      const blob = await (await fetch(uri)).blob();
      const ref = storage().ref(`/certifications/${filename}`);
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      setCertifications((prevCerts) => [...prevCerts, url]);
      console.log('Certificación subida:', url);

    } catch (error) {
      console.error('Error al seleccionar o subir certificación:', error);
    }
    finally {
      setUploadingCertification(false)
    }
  };

  const saveCertifications = async () => {
    console.log("certifications desde save", certifications)
    try {
      // Evitar múltiples ejecuciones
      if (certifications.length === 0) {
        showMessage({
          message: 'No hay certificaciones para guardar.',
          type: 'warning',
        });
        return;
      }

      // Obtener las certificaciones actuales del usuario autenticado
      const currentCertifications = userAuth.certifications ?? [];

      // Evitar agregar certificaciones repetidas
      const uniqueCertifications = certifications.filter(
        (cert) => !currentCertifications.includes(cert)
      );

      if (uniqueCertifications.length === 0) {
        showMessage({
          message: 'No hay nuevas certificaciones para guardar.',
          type: 'info',
        });
        return;
      }

      // Combinar certificaciones únicas con las existentes
      const updatedCertifications = [...currentCertifications, ...uniqueCertifications];

      // Crear el objeto con solo el campo que quieres actualizar
      const user = {
        uid: userAuth.uid, // UID para identificar al usuario
        certifications: updatedCertifications, // Certificaciones actualizadas
      };


      // Llamar a tu función para actualizar al usuario
      await updateUser(user);

      // Actualizar el estado local de userAuth (si es necesario)
      setUserAuth((prev) => ({
        ...prev,
        certifications: updatedCertifications,
      }));

      // Mostrar un mensaje de éxito
      showMessage({
        message: 'Certificaciones guardadas exitosamente.',
        type: 'success',
      });

      // // Limpia el estado de certificaciones
      setCertifications([]);
      // setDataCertifications(updatedCertifications);
    } catch (error) {
      console.error('Error al guardar certificaciones:', error);
      showMessage({
        message: `Error al guardar certificaciones: ${error.message}`,
        type: 'danger',
      });
    }
  };

  const handleRemoveCertification = async (url) => {
    try {
      const uid = userAuth.uid; // UID del usuario autenticado
      console.log("uid", uid)

      await removeCertification(uid, url);

      setDataCertifications(prevCertifications =>
        prevCertifications.filter(cert => cert !== url)
      );
      setUserAuth((prev) => ({
        ...prev,
        certifications: prev.certifications.filter((cert) => cert !== url),
      }));
      showMessage({ message: 'Certificación eliminada exitosamente.', type: 'success' });
    } catch (error) {
      showMessage({ message: `Error al eliminar la certificación: ${error.message}`, type: 'danger' });
    }
  };
  //*********************************************** */

  useEffect(() => {
    if (userAuth?.imageProfile) {
      setImage({ uri: userAuth?.imageProfile });
    }
    if (userAuth?.description) {
      setUserDescription(userAuth?.description);
    }
    if (userAuth?.cv) {
      setCvUrl(userAuth?.cv);
    }
    if (userAuth?.certifications) {
      setDataCertifications(userAuth?.certifications)
    }

    if(userAuth?.location) {
      setSelectedLocation({name:userAuth?.location})
    }
    console.log("user auth",userAuth?.location)

    

  }, [userAuth]);


  const  aceptUbication =() =>{
    setModalUbiVisible(false)
    updateProvince()
  }
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
      let source = { uri: result.assets[0].uri };
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
      let source = { uri: result.assets[0].uri };
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

  // Función para seleccionar el CV
  const handleCvPicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Limitar a archivos PDF
      });
      setCvFile(result); // Guardar el archivo seleccionado
      setCvName(result[0].name); // Guardar el nombre del archivo
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Carga de CV cancelada');
      } else {
        console.error('Error al seleccionar CV:', err);
      }
    }
  };

  const uploadCvFile = async () => {
    if (!cvFile) return;

    setUploading(true);
    const fileUri = cvFile[0].uri;
    const filename = cvFile[0].name;

    try {
      // Convierte el archivo en un blob utilizando ReactNativeBlobUtil
      const blob = await ReactNativeBlobUtil.fs.readFile(fileUri, 'base64');

      // Crea el metadato necesario para subir el archivo como blob
      const storageRef = firebase.storage().ref(`/cv/${filename}`);
      const uploadTask = storageRef.putString(blob, 'base64', { contentType: 'application/pdf' });

      await uploadTask;
      const url = await storageRef.getDownloadURL();

      console.log('URL del archivo subido:', url);
      setCvUrl(url);
      return url;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    } finally {
      setUploading(false);
    }
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
    console.log("🚀 ~ findAllProvinces ~ prov:", prov)
    setProvincias(prov);
  };

  useEffect(() => {
    findAllProvinces();
  }, []);


  const updateProvince = () => {
    const user = {
      uid: uid,
      location: selectedLocation?.name }  
      updateUser(user);
      
  }

  const onSubmit = useCallback(
    async url => {
      //const cvUrl = await uploadCvFile();

      const user = {
        uid: uid,
        // location: selectedProvince + ', Argentina',
        description: description,
        imageProfile: url,
        //cv: cvUrl, // Almacenar la URL del CV en el perfil del usuario

      };
      console.log("user", user)
      updateUser(user);
      showMessage({
        message: 'Usuario Actualizado',
        type: 'success',
      });
    },
    [image, userDescription],
  );

  let uid = userAuth?.uid;

  let minAbilities = userAuth?.abilities?.length - 5;
  const [pdfPath, setPdfPath] = useState(null); // Declara setPdfPath aquí
  const [showPdf, setShowPdf] = useState(false);

  // Función para descargar y renderizar el PDF
  const renderPDF = async () => {
    try {
      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: ReactNativeBlobUtil.fs.dirs.DocumentDir + '/my-pdf.pdf', // Ruta donde guardar el PDF
      })
        .fetch('GET', cvUrl);

      setPdfPath(res.path()); // Actualiza el estado con la ruta del PDF
    } catch (error) {
      console.error('Error al renderizar el PDF:', error);
    }
  };

  const handleCvView = async () => {
    if (!showPdf && cvUrl) {
      try {
        const res = await ReactNativeBlobUtil.config({
          fileCache: true,
          path: ReactNativeBlobUtil.fs.dirs.DocumentDir + '/my-pdf.pdf',
        }).fetch('GET', cvUrl);
        setPdfPath(res.path());
      } catch (error) {
        console.error('Error al renderizar el PDF:', error);
      }
    }
    setShowPdf(!showPdf); // Alterna entre mostrar y ocultar
  };


  const handleCvUpload = async () => {
    try {
      const cvUrl = await uploadCvFile();
      const user = {
        uid: uid,
        cv: cvUrl, // Almacenar la URL del CV en el perfil del usuario

      };
      updateUser(user);
      showMessage({
        message: 'Currículum subido',
        type: 'success',
      });
    } catch (err) {
      console.log("error al subir Currículum")
    }
  }

  // useEffect para llamar a renderPDF cuando cvUrl esté disponible
  // useEffect(() => {
  //   if (cvUrl) {
  //     const pdfPath = renderPDF(); // Llama a renderPDF si cvUrl está disponible
  //     if (pdfPath) {
  //       // Aquí puedes usar pdfPath para mostrar el PDF
  //     }
  //   }
  // }, [cvUrl]);




  const confirmDelete = (url) => {
    Alert.alert(
      "Eliminar Certificación",
      "¿Estás seguro de que quieres eliminar esta certificación?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => handleRemoveCertification(url) },
      ]
    );
  };

  const renderCertification = ({ item }) => (
    <Pressable onPress={() => /*confirmDelete(item*/ openImageModal(item)} style={styles.certificationContainer}  >
      <TouchableOpacity onPress={() => confirmDelete(item)} style={styles.trashIcon}>
        <Icon name="trash" size={22} color="red" />
      </TouchableOpacity>
      <Image
        source={{ uri: item }}
        style={styles.certificationImage}
        resizeMode="cover"
      />
    </Pressable>
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Función para abrir la modal con la imagen seleccionada
  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  // Función para cerrar la modal
  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const radius = 60;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;

  const calculateMade =( )=> {
    let completedFields = 0;
    if (image) completedFields++;
    if (selectedLocation?.name) completedFields++;
    if (userAuth?.name) completedFields++;
    if (userAuth?.email) completedFields++;
    if (description) completedFields++;
    const progressPercentage = (completedFields / 5) * 100;
    return progressPercentage
 }

  const progress = calculateMade()

  const handleSelectLocation = (provincia) => {
    console.log("🚀 ~ handleSelectLocation ~ provincia:", provincia)
    setSelectedLocation({name:provincia.nombre+", Argentina", id:provincia.id});
    console.log("selecte",selectedLocation)
  };

  const filteredProvinces = provincias.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );



  return (
    <View>
      <Text style={{ fontSize: 35, margin: "2%", color: "black", backgroundColor: "red" }}>Perfil</Text>
      <Card>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignContent: 'space-around',
          }}>
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
                  strokeDashoffset={ circumference * (1 - progress / 100)  }
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
                <View style={styles.uploadIconContainer}>
                <IconCameraPlus name="camera-plus" size={30} color={"black"} />
                </View>
              {/* Indicador de porcentaje */}
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>{progress}%</Text>
              </View>
            </View>

          <View style={styles.locationContainer}>
            <Text style={styles.title}>{userAuth?.name || ''}</Text>
            <Text style={styles.subtitle}>{userAuth?.email || ''}</Text>
            <View /*style={styles.locationContainer}*/>

           

            <View /*style={styles.locationHeader} */>
              <View style={styles.locationHeader}>                
                <Text style={styles.title}>Ubicación </Text>
                <TouchableOpacity  style={styles.changeLocationButton} onPress={() => setModalUbiVisible(true)}>
                  <Text style={styles.changeLocationText}> Editar</Text>
                </TouchableOpacity>
              </View >
              {/* <MapPin size={20} color="#4A90E2" style={styles.locationIcon} /> */}
              <View>
              {selectedLocation?.name ?
                <Text style={styles.subtitle}>{selectedLocation?.name}</Text> : <Text style={styles.ubi}> Selecciona tu ubicación</Text> }
              </View>





            </View>


        


            </View>
          </View>
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
                {userAuth?.abilities?.slice(0, 3).map((ability, index) => (
                  <AptitudeOffer title={ability} key={index} />
                ))}
                {!expandAptitude
                  ? userAuth?.abilities?.length > minAbilities && (
                    <ButtonMoreAbilities
                      buttonStyle={false}
                      titleStyle={false}
                      title={/*`+${minAbilities}`*/"Ver mas"}
                      onPress={() => setExpandAptitude(true)}
                    />
                  )
                  : userAuth?.abilities
                    .slice(2, userAuth?.abilities?.length)
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
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción</Text>
            <View style={styles.descriptionContainer}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Cuéntanos sobre ti..."
                placeholderTextColor="#9EA0A4"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>
            {description.length > 0 && (
              <Text style={styles.helperText}>
                Tu descripción ayudará a reclutadores a conocerte mejor
              </Text>
            )}
          </View>
          <Pressable style={styles.cvButton} onPress={uploadImage}>
            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" >{uploading ? "Actualizando..." : "Actualizar perfil"}</Text>
          </Pressable>

          <View style={styles.cvContainer}>

            <Text style={styles.titulo}>Currículum Vitae</Text>

            <Pressable style={styles.cvButton} onPress={handleCvPicker}>
              <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" >{cvName ? cvName : "Seleccionar"}</Text>
            </Pressable>


            <View style={styles.buttonsContainer}>

              <Pressable style={styles.cvButton} onPress={handleCvView}>
                <Text style={styles.buttonText}>  {showPdf ? 'Ocultar' : 'Visualizar'}</Text>
              </Pressable>
              <Pressable style={styles.cvButton} onPress={handleCvUpload}>
                <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" >{"Subir"}</Text>
              </Pressable>
            </View>


            {showPdf && pdfPath && (
              <View style={styles.pdfContainer}>
                <Pdf
                  source={{ uri: pdfPath, cache: false }}
                  style={styles.pdf}
                  onLoad={() => console.log('PDF rendered successfully')}
                  onError={(error) => console.error('Cannot render PDF', error)}
                  scale={1.0} // Escala inicial
                  minScale={1.0} // Escala mínima para evitar sobre-zoom out
                  maxScale={3.0} // Escala máxima para evitar zoom excesivo
                  horizontal={false} // Permitir scroll vertical
                  enablePaging={false} // Deshabilitar el pase de página automático
                  enableAnnotationRendering={true} // Mejorar visualización de anotaciones
                />
              </View>
            )}
          </View>
          <View style={styles.cvContainer}>
            <Text style={styles.titulo}>Certificaciones</Text>

            <View style={styles.buttonsContainer}>

              <Pressable style={styles.cvButton} onPress={handleCertificationPicker}>
                <Text style={styles.buttonText}>Añadir</Text>
              </Pressable>
              <Pressable style={styles.cvButton} onPress={() => saveCertifications()}>
                <Text style={styles.buttonText} >Guardar</Text>
              </Pressable>
            </View>

            {uploadingCertification && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList


              data={[...certifications, ...dataCertifications]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCertification}
              horizontal
            />
          </View>



          {/* Modal para mostrar la imagen seleccionada en grande */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeImageModal} // Para que cierre al tocar fuera en Android
          >
            <TouchableOpacity style={styles.modalContainer} onPress={closeImageModal} activeOpacity={1}>
              <View style={styles.modalContent}>
              <View style={styles.modalTitle}>
            <Text style={styles.title}>Certificado seleccionado</Text>
              <TouchableOpacity style={styles.closeIcon} onPress={ closeImageModal}>
            <MaterialIcons name="close" size={30} color="#333" />
          </TouchableOpacity> 
            </View>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.fullSizeImage}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>

          </Modal>

        {/*Modal para seleccionar la provincia*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUbiVisible}
          onRequestClose={() => setModalUbiVisible(false)}
        >
          <View style={styles.modalContainer}>
        
            <View style={styles.modalContent}>
            <View style={styles.modalTitle}>
            <Text style={styles.title}>Seleccione su ubicación</Text>
              <TouchableOpacity style={styles.closeIcon} onPress={() => setModalUbiVisible(false)}>
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
                data={filteredProvinces}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
            
                         <TouchableOpacity
                    style={[
                      styles.locationItem,
                      selectedLocation?.id === item.id && styles.locationItemSelected
                    ]}
                    onPress={() => handleSelectLocation(item)}
                  >
                       {selectedLocation?.id === item.id? 
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
                onPress={() => aceptUbication() }
              >
                <Text style={styles.closeButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        </View>
      </Card>

    </View>
  );
}
