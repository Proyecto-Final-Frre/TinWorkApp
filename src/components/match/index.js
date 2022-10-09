import {Animated, Image, Text, View} from 'react-native';
import {test} from '../../utils/matchs';
import {styles} from './styles';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {Card} from '@rneui/themed';

const Match = () => {
  return (
    <View>
      {test.map(offer => (
        <Card style={styles.container}>
          <View key={offer.id} style={styles.card}>
            <Image
              style={[styles.img, {width: 45, height: 45, margin: 2}]}
              source={require('../../images/prueba-img.jpg')}
            />
            <Text
              style={[styles.title, {paddingBottom: '2%', paddingTop: '5%'}]}>
              {offer.titulo}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Icon name={'location-pin'} size={17} />
              <Text style={{flexGrow: 5}}>{offer.ubicacion}</Text>
              <Icon name={'briefcase'} size={17} />
              <Text style={{flexGrow: 3, marginLeft: 1}}> {offer.jornada}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingBottom: '5%',
              }}>
              <Icon name={'calendar'} size={17} />
              <Text style={{flexGrow: 5, marginLeft: 1}}> {offer.tiempo}</Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

export default Match;
