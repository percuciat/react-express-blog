import React, { useEffect } from 'react';
import { List } from 'antd';
import PostListFooter from './PostListFooter';
import PostListItem from './PostListItem';
import { LoadingIndicatorS } from 'styles/commonComponents';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectPostData, selectPostLoading } from 'store/slices/post';
import { selectCurrentCategory } from 'store/slices/category';

import { fetchPosts } from 'store/slices/post/actions';

const PostList = (props: any) => {
  const { setShowModal, setLocalPostInfo } = props;
  const dispatch = useAppDispatch();
  const hasLoading = useAppSelector(selectPostLoading);
  const posts = useAppSelector(selectPostData);
  const currentCategory = useAppSelector(selectCurrentCategory);

  useEffect(() => {
    dispatch(fetchPosts({ category: currentCategory }));
  }, [dispatch, currentCategory]);

  const updatePostHandler = ({ _id, title, content, category }) => {
    setShowModal(true);
    setLocalPostInfo((prevState) => {
      return {
        ...prevState,
        info: { _id, title, content, category },
        operation: 'update',
        titleModal: 'Edit Post',
      };
    });
  };

  const createPostHandler = () => {
    setShowModal(true);
    setLocalPostInfo((prevState) => ({
      ...prevState,
      info: {},
      operation: 'create',
      titleModal: 'Create Post',
    }));
  };

  const deletePostHandler = ({ _id }) => {
    setShowModal(true);
    setLocalPostInfo((prevState) => ({
      ...prevState,
      info: { _id },
      titleModal: 'Delete Post',
      operation: 'delete',
    }));
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
        footer={<PostListFooter createPostHandler={createPostHandler} />}
        renderItem={(el: any) => (
          <PostListItem
            elementList={el}
            deletePostHandler={deletePostHandler}
            updatePostHandler={updatePostHandler}
          />
        )}
      ></List>
    </>
  );
};

export default PostList;
