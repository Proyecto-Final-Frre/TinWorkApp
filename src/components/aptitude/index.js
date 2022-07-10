import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BaseButton from '../button';
import { colors } from '../../constants/colors';

const Aptitude = ({ title, onAptitudePress }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onPress = useCallback(() => {
    setIsSelected(!isSelected);
    onAptitudePress();
  }, [isSelected, onAptitudePress]);

  return (
    <BaseButton
      title={title}
      buttonStyle={[styles.default, isSelected && styles.backgroundSelected]}
      titleStyle={[styles.titleDefault, isSelected && styles.titleSelected]}
      onPress={onPress}
      type={isSelected ? 'solid' : 'outline'}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: colors.tinworkWhite,
    borderColor: colors.tinworkBlack,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 25,
    width: 'auto',
  },
  backgroundSelected: {
    borderColor: colors.tinworkBlue,
    backgroundColor: colors.tinworkBlue,
  },
  titleDefault: {
    color: colors.tinworkBlack,
  },
  titleSelected: {
    color: colors.tinworkWhite,
  },
});

export default Aptitude;
