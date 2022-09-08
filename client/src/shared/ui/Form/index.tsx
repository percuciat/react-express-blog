import React from 'react';
import { Form as AntdForm, FormProps } from 'antd';

export const Form = (props: FormProps) => {
  return <AntdForm {...props} />;
};

export const useForm = AntdForm.useForm;
export const Field = AntdForm.Item;
