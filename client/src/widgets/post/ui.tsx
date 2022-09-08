import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/hooks/useRedux';
import { PostList, selectPostData, fetchPosts } from 'entities/post';
import { selectCategoryData } from 'entities/category';

export const PostWidget = (props) => {
  const { filterForFetchPosts } = props;

  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPostData);
  const isAuth = false;

  useEffect(() => {
    dispatch(fetchPosts(filterForFetchPosts));
  }, [dispatch, filterForFetchPosts]);

  const categories = useAppSelector(selectCategoryData);

  return (
    <>
      <PostList posts={posts} categories={categories} />
    </>
  );
};
