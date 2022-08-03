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
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 15,
    paddingHorizontal: 25,
    paddingVertical: 3,
    width: 'auto',
  },
  secondary: {
    backgroundColor: colors.tinworkWhite,
    borderColor: colors.tinworkBlack,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 15,
    paddingHorizontal: 25,
    paddingVertical: 3,
    width: 'auto',
  },
  titleDefault: {
    color: colors.tinworkWhite,
    fontFamily: FUENTES.LIGHT,
    fontSize: 16,
  },
  titleSecondary: {
    color: colors.tinworkBlack,
    fontFamily: FUENTES.LIGHT,
    fontSize: 16,
  },
});

export default Button;
