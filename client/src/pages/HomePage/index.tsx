import React from 'react';
import { Row, Col } from 'antd';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';
import { Posts } from 'containers';

const HomePage: any = (props: any) => {
  /*   , filterDate: 1 */
  const filterForFetchPosts = { filterSort: 'date', count: 3 };
  return (
    <>
      <Row align="middle">
        <Col span={12}>
          <h1>Welcome to my blog!</h1>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={24}>
          <h2>Latest posts</h2>
        </Col>
        <Col span={24}>
          <Posts filterForFetchPosts={filterForFetchPosts} />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
