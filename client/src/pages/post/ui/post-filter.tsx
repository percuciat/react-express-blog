import React, { useEffect, useMemo } from 'react';
import { Filter } from 'shared/ui';
import { Spin } from 'antd';
import { fetchCategories, setCurrentCategory } from 'entities/category';
import { useAppDispatch, useAppSelector } from 'shared/hooks/useRedux';
import { selectCurrentCategory, selectIsLoading, selectCategoryData } from 'entities/category';
import { LoadingOutlined } from '@ant-design/icons';

type TypePostFilter = any;

export const PostFilter = (props: TypePostFilter) => {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(selectCurrentCategory);
  const isCategoriesLoading = useAppSelector(selectIsLoading);
  const categories = useAppSelector(selectCategoryData);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const options = useMemo(() => {
    return categories.map((el) => ({ id: el.id, name: el.category_name, value: el.id }));
  }, [categories]);

  const filterPosts = (value: string) => {
    dispatch(setCurrentCategory(value));
  };

  return (
    <>
      {isCategoriesLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        <Filter options={options} handler={filterPosts} defaultValue={currentCategory} />
      )}
    </>
  );
};
