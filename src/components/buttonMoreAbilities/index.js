import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {FUENTES} from '../../utils/constants';
import {Button as BaseButton} from '@rneui/base';

const Button = ({title, onPress, buttonStyle, titleStyle}) => (
  <BaseButton
    title={title}
    type={'solid'}
    buttonStyle={buttonStyle ? styles.secondary : styles.default}
    titleStyle={titleStyle ? styles.titleSecondary : styles.titleDefault}
    onPress={onPress}
  />
);

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
  secondary: {
    backgroundColor: colors.tinworkWhite,
    borderColor: colors.tinworkBlue,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
    marginVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "auto",
  },
  titleDefault: {
    color: colors.tinworkWhite,
    fontFamily: FUENTES.MEDIUM,
    fontSize: 14,
    textAlign: "center",
  },
  titleSecondary: {
    color: colors.tinworkBlue,
    fontFamily: FUENTES.MEDIUM,
    fontSize: 14,
    textAlign: "center",
  }
});

export default Button;
