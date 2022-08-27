import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from '@rneui/themed';
import {Aptitude} from '../index';

const FormSection = ({aptitudes = [], title, onAptitudePress}) => (
  <Card>
    <Card.Title>{title}</Card.Title>
    <Card.Divider />
    <View style={styles.buttonsContainer}>
      {aptitudes.map(aptitude => (
        <Aptitude
          title={aptitude.title}
          key={aptitude.id}
          onAptitudePress={() => onAptitudePress(aptitude.title)}
        />
      ))}
    </View>
  </Card>
);

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default FormSection;
