import React from 'react';
import { Row, Col, Spin } from 'antd';
import { PostWidget } from 'widgets/post';
import { useAppSelector } from 'shared/hooks/useRedux';
import { selectCurrentCategory, selectIsLoading, selectCategoryData } from 'entities/category';
import { PostFilter } from './ui/post-filter';
import { Helmet } from 'react-helmet-async';
import { LoadingOutlined } from '@ant-design/icons';

export const PostPage = () => {
  const currentCategory = useAppSelector(selectCurrentCategory);
  const isCategoriesLoading = useAppSelector(selectIsLoading);
  const categories = useAppSelector(selectCategoryData);
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
          {isCategoriesLoading ? (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          ) : (
            <PostFilter currentCategory={currentCategory} categories={categories} />
          )}
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
