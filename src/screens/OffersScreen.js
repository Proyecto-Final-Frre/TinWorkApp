import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {globant} from '../services/StorageService';

export default function OffersScreen() {
  [urlImage, setUrlImage] = useState('');
  [loading, setLoading] = useState(true);

  useEffect(() => {
    globant().then(url => {
      setUrlImage(url);
      setLoading(false);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
      }}>
      <View
        style={{
          flex: 3,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -1},
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 5,
        }}>
        {!loading && (
          <Image
            style={{
              width: '100%',
              height: '30%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            source={{
              uri: `${urlImage}`,
            }}
          />
        )}
        <View
          style={{
            padding: 10,
            backgroundColor: 'grey',
            flex: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text
            style={{fontFamily: 'Cochin', fontWeight: 'bold', fontSize: 20}}>
            Desarrollador de casi todo
          </Text>
          <Text style={{fontFamily: 'Cochin', fontSize: 20}}>
            Descripcion del puesto. Mucho bla bla bla. Tener minimo 50 años
            desarrollando en react native para el puesto. Saber ingles, aleman y
            ruso
          </Text>
        </View>
      </View>
      <View style={{flex: 0.5, backgroundColor: 'black', margin: '5%'}}></View>
    </View>
  );
}
