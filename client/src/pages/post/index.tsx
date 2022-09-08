import React from 'react';
import { Row, Col } from 'antd';
import { PostWidget } from 'widgets/post';
import { PostFilter } from 'entities/post';
import { useAppSelector } from 'hooks/useRedux';
import { selectCurrentCategory } from 'store/slices/category';
import { Helmet } from 'react-helmet-async';

export const PostPage = () => {
  const currentCategory = useAppSelector(selectCurrentCategory);
  const filterForFetchPosts = { category: currentCategory, filterSort: 'title' };
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
          <PostWidget filterForFetchPosts={filterForFetchPosts} />
        </Col>
      </Row>
    </>
  );
};
