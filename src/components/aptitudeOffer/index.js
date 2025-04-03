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
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
    marginVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "auto",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  titleDefault: {
    color: colors.tinworkWhite,
    fontFamily: FUENTES.MEDIUM,
    fontSize: 14,
    textAlign: "center",
  },
});

export default AptitudeOffer;
