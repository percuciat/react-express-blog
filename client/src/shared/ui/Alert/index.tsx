import React from 'react';
import { Alert as AntdAlert, AlertProps } from 'antd';

export const Alert = (props: AlertProps) => {
  return <AntdAlert {...props} />;
};
