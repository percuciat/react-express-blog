import React from 'react';
import {Modal as ModalAnt} from 'antd';


interface IModal {
    text?: string;
    isVisible: boolean;
    handlerCancel: () => void;
    children: React.ReactNode
}

const Modal = (props: IModal) => {
    const {text, isVisible, handlerCancel, children} = props;
    return (
        <ModalAnt
            title={text}
            centered
            visible={isVisible}
            footer={null}
            onCancel={handlerCancel}
        >
            {children}
        </ModalAnt>
    );
};

export default Modal;