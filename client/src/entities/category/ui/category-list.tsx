import React, { useEffect, useState, useCallback } from 'react';
import { Col, Spin, Card } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { AlertConfirm, Modal, StyledLoadingIndicator } from 'shared/ui';

import { useAppSelector, useAppDispatch } from 'shared/hooks/useRedux';
import { selectIsLoading, selectCategoryData, fetchCategories, deleteCategory } from '../model';

export const CategoryList = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [infoCategory, setInfoCategory] = useState({ id: 0 });
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectIsLoading);
  const categories = useAppSelector(selectCategoryData);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const closeModal = () => {
    setShowModal(false);
  };

  const _delete = (id) => {
    setShowModal(true);
    setInfoCategory((prev) => ({ ...prev, id }));
  };

  const deleteHandler = useCallback(async () => {
    const response = await dispatch(deleteCategory(infoCategory.id));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
    }
  }, [infoCategory, dispatch]);

  return (
    <>
      {loading ? (
        <Spin tip="Loading..." indicator={<StyledLoadingIndicator />} />
      ) : (
        categories.map((el) => {
          return (
            <Col span={8} key={el.id}>
              <Card
                hoverable
                actions={[<DeleteTwoTone onClick={() => _delete(el.id)} />]}
                cover={
                  <img
                    alt="example"
                    /*  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" */
                  />
                }
              >
                <Card.Meta title={el.category_name} description="www.instagram.com" />
              </Card>
            </Col>
          );
        })
      )}
      <Modal isVisible={showModal} text="Delete category" onCancel={closeModal}>
        <AlertConfirm handler={deleteHandler} text="Are you sure?" />
      </Modal>
    </>
  );
};
