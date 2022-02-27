import AntForm, { FormProps as AntFormProps } from 'antd/lib/form/index';
import React from 'react';


export type FormProps = AntFormProps & {
  tooltipTitle?: React.ReactNode;
};

const Form = ({ ...props }: FormProps) => {
  return <AntForm {...props} />;
};

export default Form;