import React, { useEffect, useState, useCallback } from 'react';
import { Col, Spin, Card } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { AlertConfirm, Modal } from 'components';
import { LoadingIndicatorS } from 'styles/commonComponents';

import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectIsLoading, selectCategoryData } from 'store/slices/category';
import { fetchCategories, deleteCategory } from 'store/slices/category/actions';

const CategoryList = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [infoCategory, setInfoCategory] = useState({ _id: '' });
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
    setInfoCategory((prev) => ({ ...prev, _id: id }));
  };

  const deleteHandler = useCallback(async () => {
    const response = await dispatch(deleteCategory(infoCategory._id));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
    }
  }, [infoCategory, dispatch]);

  return (
    <>
      {loading ? (
        <Spin tip="Loading..." indicator={<LoadingIndicatorS />} />
      ) : (
        categories.map((el) => {
          return (
            <Col span={8} key={el._id}>
              <Card
                hoverable
                actions={[<DeleteTwoTone onClick={() => _delete(el._id)} />]}
                cover={
                  <img
                    alt="example"
                    /*  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" */
                  />
                }
              >
                <Card.Meta title={el.name} description="www.instagram.com" />
              </Card>
            </Col>
          );
        })
      )}
      <Modal isVisible={showModal} text="Delete category" handlerCancel={closeModal}>
        <AlertConfirm handler={deleteHandler} text="Are you sure?" />
      </Modal>
    </>
  );
};

export default CategoryList;
