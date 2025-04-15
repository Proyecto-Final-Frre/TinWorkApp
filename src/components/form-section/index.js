import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Card} from '@rneui/themed';
import {Aptitude} from '../index';
import { BACKGROUND } from '../../utils/constants';
import { colors } from '../../constants/colors';

const FormSection = ({
  aptitudes = [],
  title,
  onAptitudePress,
  userAbilities,
}) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <Card.Divider />
      <View style={styles.buttonsContainer}>
        {aptitudes.map(aptitude => (
          <Aptitude
            title={aptitude.title}
            key={aptitude.id}
            userAptitude={userAbilities?.includes(aptitude.title)}
            onAptitudePress={() => onAptitudePress(aptitude.title)}
          />
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    padding: 0,
    backgroundColor: '#f2f6fc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  header: {
    backgroundColor: colors.tinworkBlue,
    paddingVertical: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonsContainer: {
    padding: 10,
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor:BACKGROUND.secondary
  },
  titleContainer: {
    backgroundColor:BACKGROUND.secondary
  }
});

export default FormSection;
