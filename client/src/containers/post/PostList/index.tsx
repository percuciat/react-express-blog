import React, { useState, useEffect } from 'react';
import { Alert, List, Button, Skeleton, Pagination } from 'antd';
import { CloseCircleOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { AlertConfirm, Modal } from 'components';
import PostForm from 'containers/post/PostForm';
import { LoadingIndicatorS } from 'styles/commonComponents';

import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectPostData, selectPostLoading, selectPostErrors } from 'store/slices/post';
import { selectCategoryData } from 'store/slices/category';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  resetErrorsFromStore,
} from 'store/slices/post/actions';

const PostList = (props: any) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategoryData);
  const hasLoading = useAppSelector(selectPostLoading);
  const posts = useAppSelector(selectPostData);
  const backendErrors = useAppSelector(selectPostErrors);

  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [localPostInfo, setLocalPostInfo] = useState<any>({
    info: {},
    titleModal: '',
    operation: '',
  });

  useEffect(() => {
    dispatch(fetchPosts({}));
  }, [dispatch]);

  const closeModal = () => {
    setShowModal(false);
    if (backendErrors.status) {
      dispatch(resetErrorsFromStore());
    }
  };

  const handlerError = (e) => {
    console.log('e handleer', e);
  };

  const updatePostHandler = ({ _id, title, content, category }) => {
    setShowModal(true);
    setLocalPostInfo((prevState) => {
      return {
        ...prevState,
        info: { _id, title, content, category },
        operation: update,
        titleModal: 'Edit Post',
      };
    });
  };

  const update = async (newPostFormData, otherInfo) => {
    const response = await dispatch(updatePost({ ...newPostFormData, _id: otherInfo }));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
    }
  };

  const createPostHandler = () => {
    setShowModal(true);
    setLocalPostInfo((prevState) => ({
      ...prevState,
      info: {},
      operation: create,
      titleModal: 'Create Post',
    }));
  };

  const create = async (newPostFormData) => {
    const response = await dispatch(createPost(newPostFormData));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
    }
  };

  const deletePostHandler = ({ _id }) => {
    setShowModal(true);
    setLocalPostInfo((prevState) => ({
      ...prevState,
      info: { _id },
      titleModal: 'Delete Post',
    }));
  };

  const _delete = async () => {
    const response = await dispatch(deletePost(localPostInfo.info._id));
    if (response.payload.status !== 'Error') {
      setShowModal(false);
    }
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
          <Button type="primary" title="Create Post" onClick={createPostHandler}>
            Create
          </Button>
        }
        renderItem={(el: any) => {
          return (
            <List.Item
              key={el._id}
              actions={[
                <EditOutlined
                  title="Edit post"
                  className="postIcon"
                  style={{ fontSize: 25 }}
                  onClick={() => updatePostHandler(el)}
                />,
                <CloseCircleOutlined
                  title="Delete post"
                  className="postIcon"
                  style={{ fontSize: 25 }}
                  onClick={() => deletePostHandler(el)}
                />,
              ]}
            >
              <Skeleton title={true} loading={el.loading} active>
                <List.Item.Meta title={el.title} description={el.content} />
                <div>content long content</div>
              </Skeleton>
            </List.Item>
          );
        }}
      >
        <Pagination simple defaultCurrent={page} total={5} />
      </List>
      <Modal isVisible={showModal} text={localPostInfo.titleModal} handlerCancel={closeModal}>
        <>
          {localPostInfo.titleModal === 'Delete Post' ? (
            <AlertConfirm handler={_delete} text="Are you sure?" />
          ) : (
            <PostForm
              postInfo={localPostInfo.info}
              category={categories}
              onFinishFailed={handlerError}
              onFinish={localPostInfo.operation}
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

export default PostList;
