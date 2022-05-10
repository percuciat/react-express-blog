import React, { useState, useEffect } from 'react';
import { AlertConfirm, Modal } from 'components';
import { Alert, notification } from 'antd';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import PostForm from './PostForm';
import PostList from './PostList';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectPostErrors, selectPostData } from 'store/slices/post';
import { selectCategoryData } from 'store/slices/category';
import { selectCurrentCategory } from 'store/slices/category';

import { fetchPosts } from 'store/slices/post/actions';
import {
  createPost,
  updatePost,
  deletePost,
  resetErrorsFromStore,
} from 'store/slices/post/actions';

import { TLocalPostInfo } from './types';

const Posts = (props) => {
  const { filterForFetchPosts } = props;
  const [showModal, setShowModal] = useState(false);
  const [localPostInfo, setLocalPostInfo] = useState<TLocalPostInfo>({
    info: {},
    titleModal: '',
    operation: '',
  });
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(selectCurrentCategory);
  const posts = useAppSelector(selectPostData);
  const isAuth = false;

  useEffect(() => {
    dispatch(fetchPosts({ category: currentCategory })); /* .then(() => {
      setPaginationOptions(defaultState);
    }); */
  }, [dispatch, currentCategory]);

  const backendErrors = useAppSelector(selectPostErrors);
  const categories = useAppSelector(selectCategoryData);

  const closeModal = () => {
    setShowModal(false);
    if (backendErrors.status) {
      dispatch(resetErrorsFromStore());
    }
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const create = async (newPostFormData) => {
    const response = await dispatch(createPost(newPostFormData));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
      openNotification('success', 'Post has created!');
    }
  };

  const update = async (newPostFormData, otherInfo) => {
    const response = await dispatch(updatePost({ ...newPostFormData, _id: otherInfo }));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
      openNotification('success', 'Post has updated!');
    }
  };

  const _delete = async () => {
    const response = await dispatch(deletePost(localPostInfo.info._id));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
      openNotification('success', 'Post has deleted!');
    }
  };

  const handlerError = (e) => {
    console.log('e handleer', e);
  };

  const formOperations = {
    create,
    update,
  };

  /* const updatePostHandler = ({ _id, title, content, category }) => {
    setShowModal(true);
    setLocalPostInfo({
      info: { _id, title, content, category },
      operation: 'update',
      titleModal: 'Edit Post',
    });
  };
 */
  const createPostHandler = () => {
    setShowModal(true);
    setLocalPostInfo({
      info: {},
      operation: 'create',
      titleModal: 'Create Post',
    });
  };

  /* const deletePostHandler = ({ _id }) => {
    setShowModal(true);
    setLocalPostInfo({
      info: { _id },
      operation: 'delete',
      titleModal: 'Delete Post',
    });
  }; */
  function deletePostHandler(elemList) {
    setShowModal(true);
    setLocalPostInfo({
      info: { _id: elemList._id },
      operation: 'delete',
      titleModal: 'Delete Post',
    });
  }

  function updatePostHandler(elemList) {
    setShowModal(true);
    setLocalPostInfo({
      info: {
        _id: elemList._id,
        title: elemList.title,
        content: elemList.content,
        category: elemList.category,
      },
      operation: 'update',
      titleModal: 'Edit Post',
    });
  }

  const actionElements = {
    postElement: [
      <EditOutlined
        title="Edit post"
        className="postIcon"
        style={{ fontSize: 25 }}
        onClick={updatePostHandler}
      />,
      <CloseCircleOutlined
        title="Delete post"
        className="postIcon"
        style={{ fontSize: 25 }}
        onClick={deletePostHandler}
      />,
    ],
    footer: { createPostHandler },
  };

  const postOperations = isAuth ? actionElements : { postElement: [], footer: {} };

  return (
    <>
      <PostList
        posts={posts}
        postElementOperations={postOperations.postElement}
        footerOperations={postOperations.footer}
      />
      {isAuth && (
        <Modal isVisible={showModal} text={localPostInfo.titleModal} handlerCancel={closeModal}>
          <>
            {localPostInfo.titleModal === 'Delete Post' ? (
              <AlertConfirm handler={_delete} text="Are you sure?" />
            ) : (
              <PostForm
                postInfo={localPostInfo.info}
                category={categories}
                onFinishFailed={handlerError}
                onFinish={formOperations[localPostInfo.operation]}
              />
            )}
            {backendErrors.status &&
              backendErrors.errorData.map((errors) => {
                return (
                  <Alert
                    key={errors.value}
                    message="Error"
                    showIcon
                    description={errors.message}
                    type="error"
                    closable
                  />
                );
              })}
          </>
        </Modal>
      )}
    </>
  );
};

export default Posts;
