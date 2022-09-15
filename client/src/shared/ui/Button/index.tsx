import React from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';

export const Button = (props: ButtonProps) => {
  return <AntdButton {...props} />;
};
