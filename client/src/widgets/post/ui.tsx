import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/hooks/useRedux';
import { PostList, selectPostData, fetchPosts, PostForm } from 'entities/post';
import { selectCategoryData, selectCurrentCategory } from 'entities/category';

type PostWidgetProps = {
  dataForFilter?: any;
  hasActions?: boolean;
};

export const PostWidget = (props: PostWidgetProps) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPostData);
  const currentCategory = useAppSelector(selectCurrentCategory);
  const categories = useAppSelector(selectCategoryData);
  const isAuth = false;
  const { hasActions, dataForFilter } = props;

  useEffect(() => {
    const filter = dataForFilter
      ? dataForFilter
      : {
          category: currentCategory,
        };
    dispatch(fetchPosts(filter));
  }, [dispatch, currentCategory, dataForFilter]);

  return (
    <>
      <PostList posts={posts} hasActions={hasActions} />
      <PostForm categories={categories} />
    </>
  );
};
