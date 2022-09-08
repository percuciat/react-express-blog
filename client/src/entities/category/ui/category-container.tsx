import React, { useState } from 'react';
import { Alert, notification, Row } from 'antd';
import { Modal } from 'shared/ui';
import { CategoryList } from './category-list';
import { CategoryForm } from './category-form';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectCategoryErrors } from 'store/slices/category';
import { createCategory, resetErrorsFromStore } from 'store/slices/category/actions';

export const CategoryContainer = (props) => {
  const { showModal, setShowModal } = props;
  const dispatch = useAppDispatch();
  const backendErrors = useAppSelector(selectCategoryErrors);

  const closeModal = () => {
    setShowModal(false);
    if (backendErrors.status) {
      dispatch(resetErrorsFromStore());
    }
  };

  const onFinishFailed = (r) => {
    console.log('Error', r);
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const create = async (newCategoryFormData) => {
    const { category } = newCategoryFormData;
    const response = await dispatch(createCategory(category));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
      openNotification('success', 'Category has created!');
    }
  };

  return (
    <>
      <Row align="middle" gutter={18}>
        <CategoryList setShowModal={setShowModal} />
      </Row>

      <Modal isVisible={showModal} text="Create new Category" handlerCancel={closeModal}>
        <CategoryForm handler={create} errorHandler={onFinishFailed} />
        {backendErrors.status &&
          backendErrors.errorData.map((errors) => {
            return (
              <Alert
                key={errors.param}
                message="Error"
                showIcon
                description={errors.message}
                type="error"
                closable
              />
            );
          })}
      </Modal>
    </>
  );
};
