import React from 'react';
import { Row, Col } from 'antd';
import { Posts, PostFilter } from 'containers';
import { useAppSelector } from 'hooks/useRedux';
import { selectCurrentCategory } from 'store/slices/category';

const PostPage = () => {
  const currentCategory = useAppSelector(selectCurrentCategory);
  const filterForFetchPosts = { category: currentCategory, filterSort: 'title' };
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
          <Posts filterForFetchPosts={filterForFetchPosts} />
        </Col>
      </Row>
    </>
  );
};

export default PostPage;
