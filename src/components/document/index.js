import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  View,
  Pressable,
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
import { styles } from './styles';
import * as ImagePicker from 'react-native-image-picker';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util'
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../constants/colors';


export default function Document({ navigation }) {
  const [userAuth, setUserAuth] = useState();
  const [cvFile,setCvFile ] = useState('');
  const [cvName, setCvName] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [uploading,setUploading] = useState(false)
  const [pdfPath, setPdfPath] = useState(null); 
  const [showPdf, setShowPdf] = useState(false);
  const [uploadingCertification, setUploadingCertification] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [dataCertifications, setDataCertifications] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
    
  useEffect(() => {
      const getAbilitiesByUidUser = async () => {
        // setLoading(true); // Activa el loading
        try {
          let userAuthenticated = await findUserAuthenticated();
          let user = await findByUid(userAuthenticated.uid);
          setUserAuth(user);
        } catch (error) {
          console.error("Error cargando usuario:", error);
        }
        // setLoading(false); // Desactiva el loading cuando termina
      };
      getAbilitiesByUidUser();
    }, []);

    useEffect(() => {
      if (userAuth?.cv) {
        setCvUrl(userAuth?.cv);
      }
      if (userAuth?.certifications) {
        setDataCertifications(userAuth?.certifications)
      }
  
    }, [userAuth]);

  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const handleCvPicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
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

  const handleCvView = async () => {
    if (!showPdf && cvUrl) {
      try {
        const res = await ReactNativeBlobUtil.config({
          fileCache: true,
          path: ReactNativeBlobUtil.fs.dirs.DocumentDir + '/my-pdf.pdf',
        }).fetch('GET', cvUrl);
        console.log("🚀 ~ handleCvView ~ res.path():", res.path())
        setPdfPath(res.path());
      } catch (error) {
        console.error('Error al renderizar el PDF:', error);
      }
    }
    setShowPdf(!showPdf); // Alterna entre mostrar y ocultar
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
  
      setCvUrl(url);
      return url;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleCvUpload = async () => {
    try {
      const cvUrl = await uploadCvFile();
      const user = {
        uid: userAuth.uid,
        cv: cvUrl, // Almacenar la URL del CV en el perfil del usuario

      };
      updateUser(user);
      showMessage({
        message: 'Currículum subido',
        type: 'success',
      });
      setShowPdf(!showPdf);
    } catch (err) {
      console.log("error al subir Currículum",err)
    }
  }

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
      if (certifications.length > 0) { 
        setCertifications([])
        showMessage({
          message:'Certificación eliminada exitosamente.',
          type: 'success',
        });
        return;
      }
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
  return (
    <>
    
      <Card containerStyle={styles.card} >
        <View style={styles.cvContainer}>

          <Text style={styles.title}>Currículum Vitae 📄 </Text>          

          <Pressable style={styles.cvButton} onPress={handleCvPicker}>
            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail" >{cvName ? cvName : "Seleccionar"}</Text>
            
          </Pressable>

          {uploading && <ActivityIndicator color={colors.tinworkBlue} style={{margin:"1%"}} />}
          <View style={styles.buttonsContainer}>      
            <Pressable style={styles.cvButton} onPress={handleCvView}>
            <MaterialIcons name={showPdf ? 'visibility' : 'visibility-off'}  size={20} color="#fff"   style={{ marginRight: 8 }}  />
              <Text style={styles.buttonText}>  {showPdf ? 'Ocultar' : 'Visualizar'}</Text>
            </Pressable>
            <Pressable style={styles.uploadContainer} onPress={handleCvUpload}>
            <MaterialIcons name="cloud-upload" size={20} color="#fff"   style={{ marginRight: 8 }}  />
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
          <Text style={styles.title}>Certificaciones 🎓</Text>
          {uploadingCertification &&   <ActivityIndicator color={colors.tinworkBlue} style={{margin:"1%"}} />}
          <FlatList
            data={[...certifications, ...dataCertifications]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCertification}
            horizontal
          />
          <View style={styles.buttonsContainer}>
            <Pressable style={styles.cvButton} onPress={handleCertificationPicker}>
              <Text style={styles.buttonText}>Seleccionar</Text>
            </Pressable>
            <Pressable style={styles.uploadContainer} onPress={() => saveCertifications()}>
              <MaterialIcons name="cloud-upload" size={20} color="#fff"   style={{ marginRight: 8 }}  />
              <Text style={styles.buttonText} >Subir</Text>
            </Pressable>
          </View>       
        </View>
      </Card> 

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          onPress={closeImageModal} 
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Certificado 🏅</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
                <MaterialIcons name="close" size={24} color="#333" />
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

    </>
  );
}
