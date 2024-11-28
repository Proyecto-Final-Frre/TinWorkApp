import React from 'react';
import {Animated, Text, View,Image} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Entypo';
import FormSubmitButton from '../form-submit-button';
import {styles} from './style';

export default function DefaultCard({ ...rest }) {
  return (
    <Animated.View style={[styles.container]} {...rest}>
      <View style={styles.shadow}>
        <View style={styles.card}>
          <Text
            style={[styles.title, {alignSelf:"center",margin:"5%", paddingBottom: '15%', paddingTop: '15%'}]}>
            No hay ofertas disponibles para ti en este momento.
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../images/workTime.png')} // Reemplaza con tu imagen
              style={styles.image}
              resizeMode="contain"
            />
          </View>  
         
          <FormSubmitButton
           title={'Cargar más'}
           onSubmit={() => {
          //  getAbilitiesByUidUser();
          //    findOffersByAbilities();
             showMessage({
              message: 'Ofertas Cargadas',
              type: 'success',
            });
           }}
           style={styles.button}

         />
       
        </View>
        
      </View>
      
    </Animated.View>
  );
}
