import React from 'react';
import { Modal as ModalAnt, ModalProps } from 'antd';

interface TypeModal extends ModalProps {
  text?: string;
  isVisible: boolean;
  children: React.ReactNode;
}

export const Modal = (props: TypeModal) => {
  const { text, isVisible, children } = props;
  return (
    <ModalAnt
      title={text}
      centered
      visible={isVisible}
      footer={null}
      {...props}
    >
      {children}
    </ModalAnt>
  );
};
