import AntSelect, { SelectProps as AntSelectProps } from 'antd/lib/select/index';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

export type SelectProps = AntSelectProps & {
  tooltipTitle?: React.ReactNode;
};

const Select = ({ options, ...props }: AntSelectProps) => {
  return <AntSelect {...props} />;
};

export default Select;
