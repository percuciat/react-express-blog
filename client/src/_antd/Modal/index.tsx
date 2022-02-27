import AntModal, { ModalProps as AntModalProps } from 'antd/lib/modal/index';
import Tooltip from 'antd/lib/tooltip';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

export type ModalProps = AntModalProps & {
  tooltipTitle?: React.ReactNode;
};

const Modal = ({ tooltipTitle, ...props }: ModalProps) => {
  return <AntModal {...props} />;
};

export default Modal;
