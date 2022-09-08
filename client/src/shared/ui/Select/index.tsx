import React from 'react';
import { Select as AntdSelect, SelectProps } from 'antd';

export const Select = (props: SelectProps) => {
  return <AntdSelect {...props} />;
};
export const Option = AntdSelect.Option;
