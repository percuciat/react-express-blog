import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { Category } from 'containers';

const CategoryPage: any = (props: any) => {
  const [showModal, setShowModal] = useState(false);

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
      <Category setShowModal={setShowModal} showModal={showModal} />
    </>
  );
};

export default CategoryPage;
