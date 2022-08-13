import React from 'react';
import {Button as BaseButton} from '@rneui/base';

const Button = ({
  title,
  type,
  buttonStyle = {},
  onPress,
  titleStyle = {},
  disabled,
}) => (
  <BaseButton
    title={title}
    type={type}
    buttonStyle={buttonStyle}
    titleStyle={titleStyle}
    onPress={onPress}
    disabled={disabled}
  />
);

export default Button;
