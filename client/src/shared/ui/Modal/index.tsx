import React from 'react';
import { Modal as ModalAnt, ModalProps } from 'antd';

interface TypeModal extends ModalProps {
  text?: string;
  isOpen: boolean;
  children: React.ReactNode;
}

export const Modal = (props: TypeModal) => {
  const { text, isOpen, children } = props;
  return (
    <ModalAnt
      title={text}
      centered
      open={isOpen}
      footer={null}
      {...props}
    >
      {children}
    </ModalAnt>
  );
};
