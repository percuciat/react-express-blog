import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Input, Spin, Card } from 'antd';
import { LoadingOutlined, DeleteTwoTone } from '@ant-design/icons';
import { Modal } from 'components';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectIsLoading, selectCategoryData } from 'store/slices/category';
import { fetchCategories, createCategory, deleteCategory } from 'store/slices/category/actions';

const CategoryPage: any = (props: any) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectIsLoading);
  const categories = useAppSelector(selectCategoryData);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const create = (newCategoryFormData) => {
    const { category } = newCategoryFormData;
    dispatch(createCategory(category));
    setShowModal(false);
  };

  const deleteHandler = (_id) => {
    dispatch(deleteCategory(_id));
  };

  const onFinishFailed = (r) => {
    console.log('Error', r);
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
        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        ) : (
          categories.map((el) => {
            return (
              <Col span={8} key={el._id}>
                <Card
                  hoverable
                  actions={[<DeleteTwoTone onClick={() => deleteHandler(el._id)} />]}
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
      </Row>
      <Modal isVisible={showModal} text="Create new Category" handlerCancel={closeModal}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={create}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Category name"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input category name!',
              },
            ]}
          >
            <Input placeholder="Title category" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryPage;
