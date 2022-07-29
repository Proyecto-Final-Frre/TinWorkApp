import React from 'react';
import {Button as BaseButton} from '@rneui/base';

const Button = ({title, type, buttonStyle = {}, titleStyle = {}}) => (
  <BaseButton
    title={title}
    type={type}
    buttonStyle={buttonStyle}
    titleStyle={titleStyle}
  />
);

export default Button;
