import React from 'react';
import {Modal as ModalAnt} from 'antd';


interface IModal {
    text?: string;
    isVisible: boolean;
    handlerOk: () => void;
    handlerCancel: () => void;
    children: React.ReactNode
}

const Modal = (props: IModal) => {
    const {text, isVisible, handlerOk, handlerCancel, children} = props;
    return (
        <ModalAnt
            title={text}
            centered
            visible={isVisible}
            onOk={handlerOk}
            onCancel={handlerCancel}
        >
            {children}
        </ModalAnt>
    );
};

export default Modal;