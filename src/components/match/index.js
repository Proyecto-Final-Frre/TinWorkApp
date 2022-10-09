import {Image, Text, View} from 'react-native';
import {test} from '../../utils/matchs';
import {styles} from './styles';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {Card} from '@rneui/themed';

const Match = () => {
  return (
    <View>
      <Text style={styles.mismatchs}>Mis Matchs</Text>
      {test.map(offer => (
        <Card>
          <View style={styles.containerrrr}>
            <Image
              style={styles.img}
              source={require('../../images/prueba-img.jpg')}
            />
            <View style={styles.vistaGeneral}>
              <Text style={styles.title}>{offer.titulo}</Text>
              <View style={styles.descripcion}>
                <View style={styles.ubicacion}>
                  <Icon name={'location-pin'} size={17} />
                  <Text style={styles.texto}>{offer.ubicacion}</Text>
                </View>
                <View style={styles.ubicacion}>
                  <Icon name={'briefcase'} size={17} />
                  <Text style={styles.texto}> {offer.jornada}</Text>
                </View>
                <View style={styles.ubicacion}>
                  <Icon name={'calendar'} size={17} />
                  <Text style={styles.texto}> {offer.tiempo}</Text>
                </View>
                {/*<View>
                  <Icon name={'location-pin'} size={17} />
                  <Text>{offer.ubicacion}</Text>
                  <Icon name={'briefcase'} size={17} />
                  <Text> {offer.jornada}</Text>
                </View>
                <View>
                  <Icon name={'calendar'} size={17} />
                  <Text> {offer.tiempo}</Text>
      </View>*/}
              </View>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

export default Match;
