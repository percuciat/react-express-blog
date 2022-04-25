import React, { useState } from 'react';
import { AlertConfirm, Modal } from 'components';
import { Alert, notification } from 'antd';
import PostForm from './PostForm';
import PostList from './PostList';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectPostErrors } from 'store/slices/post';
import { selectCategoryData } from 'store/slices/category';
import {
  createPost,
  updatePost,
  deletePost,
  resetErrorsFromStore,
} from 'store/slices/post/actions';

import { TLocalPostInfo } from './types';

const Posts = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [localPostInfo, setLocalPostInfo] = useState<TLocalPostInfo>({
    info: {},
    titleModal: '',
    operation: '',
  });

  const backendErrors = useAppSelector(selectPostErrors);
  const dispatch = useAppDispatch();
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

  const operations = {
    create,
    update,
  };

  return (
    <>
      <PostList setShowModal={setShowModal} setLocalPostInfo={setLocalPostInfo} />
      <Modal isVisible={showModal} text={localPostInfo.titleModal} handlerCancel={closeModal}>
        <>
          {localPostInfo.titleModal === 'Delete Post' ? (
            <AlertConfirm handler={_delete} text="Are you sure?" />
          ) : (
            <PostForm
              postInfo={localPostInfo.info}
              category={categories}
              onFinishFailed={handlerError}
              onFinish={operations[localPostInfo.operation]}
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
    </>
  );
};

export default Posts;
