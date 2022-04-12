import React from 'react';
import { Row, Col } from 'antd';
import { Posts, PostFilter } from 'containers';

const PostPage = () => {
  return (
    <>
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
          <Posts />
        </Col>
      </Row>
    </>
  );
};

export default PostPage;
