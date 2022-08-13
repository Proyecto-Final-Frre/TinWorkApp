import React from 'react';
import {StyleSheet} from 'react-native';
import BaseButton from '../button';

const FormSubmitButton = ({onSubmit, title = 'Aceptar'}) => (
  <BaseButton title={title} buttonStyle={styles.container} onPress={onSubmit} />
);

const styles = StyleSheet.create({
  container: {marginHorizontal: 15, marginVertical: 15},
});

export default FormSubmitButton;
