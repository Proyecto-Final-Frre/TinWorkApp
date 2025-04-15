import React from 'react';
import {StyleSheet} from 'react-native';
import BaseButton from '../button';
import { BACKGROUND } from '../../utils/constants';
import { colors } from '../../constants/colors';

const FormSubmitButton = ({onSubmit, disabled, title = 'Aceptar'}) => (
  <BaseButton
    title={title}
    buttonStyle={styles.container}
    onPress={onSubmit}
    disabled={disabled}
  />
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15, 
    marginVertical: 15,
    backgroundColor:colors.tinworkBlack

  },
});

export default FormSubmitButton;
