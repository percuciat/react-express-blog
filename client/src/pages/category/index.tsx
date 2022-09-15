import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { CategoryContainer, setOpenModal, setLocalCategoryInfo } from 'entities/category';
import { Helmet } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from 'shared/hooks/useRedux';

export const CategoryPage: any = (props: any) => {
  const dispatch = useAppDispatch();
  const createHandler = () => {
    dispatch(
      setLocalCategoryInfo({
        info: {},
        operation: 'create',
        titleModal: 'Create category',
      })
    );
    dispatch(setOpenModal(true));
  };
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Category | blog</title>
        <meta name="description" content="Demo Category" />
      </Helmet>

      <Row align="middle">
        <Col span={10}>
          <h1>CategoryPage</h1>
        </Col>
        <Col span={2}>
          <Button onClick={createHandler}>Create</Button>
        </Col>
      </Row>
      <CategoryContainer />
    </>
  );
};
