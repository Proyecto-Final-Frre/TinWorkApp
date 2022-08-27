import React from 'react';
import {StyleSheet} from 'react-native';
import BaseButton from '../buttonOffer';
import {colors} from '../../constants/colors';
import {FONT_SIZE, FUENTES} from '../../utils/constants';

const AptitudeOffer = ({title}) => {
  return (
    <BaseButton
      title={title}
      buttonStyle={[styles.default]}
      titleStyle={[styles.titleDefault]}
      type={'solid'}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: colors.tinworkBlue,
    borderColor: colors.tinworkBlue,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 25,
    paddingVertical: 3,
    width: 'auto',
  },
  titleDefault: {
    color: colors.tinworkWhite,
    fontFamily: FUENTES.LIGHT,
    fontSize: 16,
  },
});

export default AptitudeOffer;
