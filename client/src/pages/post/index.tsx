import React from 'react';
import { Row, Col } from 'antd';
import { PostWidget } from 'widgets/post';
import { PostFilter } from './ui/post-filter';
import { Helmet } from 'react-helmet-async';

export const PostPage = () => {

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Posts | blog</title>
        <meta name="description" content="Demo Post page" />
      </Helmet>

      <Row align="middle">
        <Col span={6}>
          <h1>PostPage</h1>
        </Col>
        <Col span={6}>
          <PostFilter />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <PostWidget hasActions={true} />
        </Col>
      </Row>
    </>
  );
};
