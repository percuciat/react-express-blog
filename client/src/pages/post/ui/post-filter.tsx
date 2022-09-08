import React, { useEffect } from 'react';
import { Filter } from 'shared/ui';
import { fetchCategories, setCurrentCategory } from 'entities/category';
import { useAppDispatch } from 'shared/hooks/useRedux';

type TypePostFilter = {
  currentCategory: string;
  categories: any;
};

export const PostFilter = (props: TypePostFilter) => {
  const dispatch = useAppDispatch();
  const { currentCategory, categories } = props;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filterPosts = (value: string) => {
    dispatch(setCurrentCategory(value));
  };

  return (
    <>
      <Filter options={categories} handler={filterPosts} defaultValue={currentCategory} />
    </>
  );
};
