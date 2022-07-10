import React from 'react';
import { Button as BaseButton } from '@rneui/base';

const Button = ({
  title,
  type,
  buttonStyle = {},
  onPress,
  titleStyle = {},
}) => (
  <BaseButton
    title={title}
    type={type}
    buttonStyle={buttonStyle}
    titleStyle={titleStyle}
    onPress={onPress}
  />
);

export default Button;
