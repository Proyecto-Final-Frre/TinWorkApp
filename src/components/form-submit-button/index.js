import React from 'react';
import {StyleSheet} from 'react-native';
import BaseButton from '../button';

const FormSubmitButton = ({onSubmit, disabled}) => (
  <BaseButton
    title="Aceptar"
    buttonStyle={styles.container}
    onPress={onSubmit}
    disabled={disabled}
  />
);

const styles = StyleSheet.create({
  container: {marginHorizontal: 15, marginVertical: 15},
});

export default FormSubmitButton;
