import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { CategoryContainer } from 'entities/category';
import { Helmet } from 'react-helmet-async';

export const CategoryPage: any = (props: any) => {
  const [showModal, setShowModal] = useState(false);
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
          <Button onClick={() => setShowModal(true)}>Create</Button>
        </Col>
      </Row>
      <CategoryContainer setShowModal={setShowModal} showModal={showModal} />
    </>
  );
};
