import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {findUserAuthenticated} from '../../../AuthService';
import {findByUid} from '../../services/UserService';
import {Card} from '@rneui/themed';
import {Aptitude} from '../index';

const FormSection = ({
  aptitudes = [],
  title,
  onAptitudePress,
  userAbilities,
}) => {
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <View style={styles.buttonsContainer}>
        {aptitudes.map(aptitude => (
          <Aptitude
            title={aptitude.title}
            key={aptitude.id}
            userAptitude={userAbilities.includes(aptitude.title)}
            onAptitudePress={() => onAptitudePress(aptitude.title)}
          />
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default FormSection;
