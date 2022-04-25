import React, { useEffect, useState, useCallback } from 'react';
import { List } from 'antd';
import PostListFooter from './PostListFooter';
import PostListItem from './PostListItem';
import { LoadingIndicatorS } from 'styles/commonComponents';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectPostData, selectPostLoading } from 'store/slices/post';
import { selectCurrentCategory } from 'store/slices/category';

import { fetchPosts } from 'store/slices/post/actions';
import { TPaginationOptions, TListElem, TPostListProps } from '../types';

const defaultState = {
  current: 1,
  minIndex: 0,
  maxIndex: 5,
  postsOnPage: 5,
};

const PostList = (props: TPostListProps) => {
  const { setShowModal, setLocalPostInfo } = props;
  const dispatch = useAppDispatch();
  const hasLoading = useAppSelector(selectPostLoading);
  const posts = useAppSelector(selectPostData);
  const currentCategory = useAppSelector(selectCurrentCategory);

  const [paginationOptions, setPaginationOptions] = useState<TPaginationOptions>(defaultState);

  useEffect(() => {
    dispatch(fetchPosts({ category: currentCategory })).then(() => {
      setPaginationOptions(defaultState);
    });
  }, [dispatch, currentCategory]);

  const updatePostHandler = ({ _id, title, content, category }) => {
    setShowModal(true);
    setLocalPostInfo({
      info: { _id, title, content, category },
      operation: 'update',
      titleModal: 'Edit Post',
    });
  };

  const createPostHandler = () => {
    setShowModal(true);
    setLocalPostInfo({
      info: {},
      operation: 'create',
      titleModal: 'Create Post',
    });
  };

  const deletePostHandler = ({ _id }) => {
    setShowModal(true);
    setLocalPostInfo({
      info: { _id },
      operation: 'delete',
      titleModal: 'Delete Post',
    });
  };

  const handlePaginationChange = (page: number, size: number) => {
    setPaginationOptions({
      current: page,
      minIndex: (page - 1) * size,
      maxIndex: page * size,
      postsOnPage: size,
    });
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        locale={{
          emptyText: 'no Posts',
        }}
        loading={{
          spinning: hasLoading,
          indicator: <LoadingIndicatorS />,
        }}
        footer={
          <PostListFooter
            handlePaginationChange={handlePaginationChange}
            postsData={posts}
            createPostHandler={createPostHandler}
            paginationOptions={paginationOptions}
          />
        }
        renderItem={(el: TListElem, index) =>
          index >= paginationOptions.minIndex &&
          index < paginationOptions.maxIndex && (
            <PostListItem
              key={el._id}
              elementList={el}
              deletePostHandler={deletePostHandler}
              updatePostHandler={updatePostHandler}
            />
          )
        }
      ></List>
    </>
  );
};

export default PostList;
