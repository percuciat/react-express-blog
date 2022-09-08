import React from 'react';
import { Row, Col } from 'antd';
import { PostWidget } from 'widgets/post';
import { Helmet } from 'react-helmet-async';

export const HomePage: any = (props: any) => {
  /*   , filterDate: 1 */
  const filterForFetchPosts = { filterSort: 'date', count: 3 };
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>blog</title>
        <meta name="description" content="Demo Home page" />
      </Helmet>

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
          <PostWidget filterForFetchPosts={filterForFetchPosts} />
        </Col>
      </Row>
    </>
  );
};
