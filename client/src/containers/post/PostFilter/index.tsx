import React, { useEffect } from 'react';
import { Filter } from 'components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { selectIsLoading, selectCategoryData } from 'store/slices/category';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { fetchCategories } from 'store/slices/category/actions';
import { fetchPosts } from 'store/slices/post/actions';

const PostFilter = () => {
  const dispatch = useAppDispatch();
  const isCategoriesLoading = useAppSelector(selectIsLoading);
  const categories = useAppSelector(selectCategoryData);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filterPosts = (value) => {
    dispatch(fetchPosts({ category: value }));
  };

  return (
    <>
      {isCategoriesLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        <Filter options={categories} handler={filterPosts} />
      )}
    </>
  );
};

export default PostFilter;
