import React, { useEffect } from 'react';
import { Filter } from 'shared/ui';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { selectIsLoading, selectCategoryData, selectCurrentCategory } from 'store/slices/category';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { fetchCategories, setCurrentCategory } from 'store/slices/category/actions';

export const PostFilter = () => {
  const dispatch = useAppDispatch();
  const isCategoriesLoading = useAppSelector(selectIsLoading);
  const categories = useAppSelector(selectCategoryData);
  const currentCategory = useAppSelector(selectCurrentCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filterPosts = (value: string) => {
    dispatch(setCurrentCategory(value));
  };

  return (
    <>
      {isCategoriesLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        <Filter options={categories} handler={filterPosts} defaultValue={currentCategory} />
      )}
    </>
  );
};
