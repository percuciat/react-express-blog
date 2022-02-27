import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert } from 'antd';
import { Modal } from 'components';
import { CategoryList, CategoryForm } from 'containers';

import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectCategoryErrors } from 'store/slices/category';
import { createCategory, resetErrorsFromStore } from 'store/slices/category/actions';

const CategoryPage: any = (props: any) => {
  const dispatch = useAppDispatch();
  const backendErrors = useAppSelector(selectCategoryErrors);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    if (backendErrors.status) {
      dispatch(resetErrorsFromStore());
    }
  };

  const onFinishFailed = (r) => {
    console.log('Error', r);
  };

  const create = async (newCategoryFormData) => {
    const { category } = newCategoryFormData;
    const response = await dispatch(createCategory(category));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
    }
  };

  return (
    <>
      <Row align="middle">
        <Col span={10}>
          <h1>CategoryPage</h1>
        </Col>
        <Col span={2}>
          <Button onClick={() => setShowModal(true)}>Create</Button>
        </Col>
      </Row>
      <Row gutter={16}>
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

export default CategoryPage;
