import React, {useState, useEffect} from 'react';
import {ImageBackground, Image, Text, View, Pressable} from 'react-native';
import {Card} from '@rneui/themed';
import {findUserAuthenticated} from '../../../AuthService';
import {findByUid} from '../../services/UserService';
import AptitudeOffer from '../aptitudeOffer';
import ButtonMoreAbilities from '../buttonMoreAbilities';
import {styles} from './styles';
import FormSubmitButton from '../form-submit-button';
import {todasProvincias} from '../../services/ProvinceService';
import {Picker} from '@react-native-picker/picker';

export default function Profile() {
  const [userAuth, setUserAuth] = useState();
  const [expandAptitude, setExpandAptitude] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState();

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

  let minAbilities = userAuth?.abilities.length - 5;

  return (
    <View>
      <Text style={styles.mismatchs}>Mi Perfil</Text>
      <Card>
        <View style={styles.containerrrr}>
          <View style={styles.imageContainer}>
            <Pressable onPress={() => console.log('Cambiar Foto')}>
              <ImageBackground
                style={styles.img}
                source={require('../../images/descarga.jpg')}>
                <Text style={styles.textoImagen}>Cambiar Foto</Text>
              </ImageBackground>
            </Pressable>
          </View>
          <View style={styles.nombreymail}>
            <Text style={styles.titulos}>Nombre Completo</Text>
            <Text style={styles.datos}>{userAuth?.name || ''}</Text>
            <Text style={styles.titulos}>E-Mail</Text>
            <Text style={styles.datos}>{userAuth?.email || ''}</Text>
          </View>
        </View>
        <View style={styles.nombreymail}>
          <Text style={styles.tituloSecun}>Habilidades</Text>
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
            <View style={styles.tituloyBoton}>
              <Text style={styles.tituloSecun}>Ubicación</Text>
              <Pressable
                style={styles.button}
                onPress={() => console.log('Editar Ubicacion')}>
                <Text style={styles.botonEditar}>Editar</Text>
              </Pressable>
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
            <View style={styles.tituloyBoton}>
              <Text style={styles.tituloSecun}>Descripción</Text>
              <Pressable
                style={styles.button}
                onPress={() => console.log('Editar Descripcion')}>
                <Text style={styles.botonEditar}>Editar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Card>
      <FormSubmitButton title={`Aplicar Cambios`} />
    </View>
  );
}
