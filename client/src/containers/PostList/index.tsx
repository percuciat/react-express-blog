import React, { useState, useEffect } from 'react';
import { List, Button, Skeleton } from 'antd';
import { CloseCircleOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Alert, FormPost, Modal } from 'components';

import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectPostData, selectPostLoading } from 'store/slices/post';
import { selectCategoryData } from 'store/slices/category';
import { fetchPosts, createPost, updatePost, deletePost } from 'store/slices/post/actions';

type TEl = { _id: string; title: string; content: string };

const PostList = (props: any) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategoryData);
  const hasLoading = useAppSelector(selectPostLoading);
  const posts = useAppSelector(selectPostData);
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
  };

  const handlerError = () => {};

  const updatePostHandler = ({ _id, title, content, category }) => {
    setShowModal(true);
    setLocalPostInfo((prevState) => {
      console.log('prevState--', prevState);

      return {
        ...prevState,
        info: { ...prevState.info, _id: 'LLLLL', title: 'asdas', content: 'cont', category: 'CAt' },
        operation: update,
        titleModal: 'Edit Post',
      };
    });
  };

  const update = (newPostFormData) => {
    console.log('ocalPostInfo', localPostInfo);

    /* dispatch(updatePost({ ...newPostFormData, _id: localPostInfo.info._id }));
    setShowModal(false); */
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

  const create = (newPostFormData) => {
    console.log('newPostFormData--', newPostFormData);

    dispatch(createPost(newPostFormData));
    setShowModal(false);
  };

  const deletePostHandler = ({ _id }) => {
    setShowModal(true);
    setLocalPostInfo((prevState) => ({
      ...prevState,
      info: { _id },
      operation: _delete,
      titleModal: 'Delete Post',
    }));
  };

  const _delete = () => {
    dispatch(deletePost(localPostInfo.info._id));
    setShowModal(false);
  };

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={posts}
        locale={{
          emptyText: 'no Posts',
        }}
        loading={{
          spinning: hasLoading,
          indicator: <LoadingOutlined style={{ fontSize: 25 }} />,
        }}
        footer={
          <Button type="primary" onClick={createPostHandler}>
            create
          </Button>
        }
        renderItem={(el: any) => {
          return (
            <List.Item
              key={el._id}
              actions={[
                <EditOutlined
                  className="postIcon"
                  style={{ fontSize: 25 }}
                  onClick={() => updatePostHandler(el)}
                />,
                <CloseCircleOutlined
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
      ></List>
      <Modal isVisible={showModal} text={localPostInfo.titleModal} handlerCancel={closeModal}>
        {localPostInfo.titleModal === 'Delete Post' ? (
          <Alert handler={_delete} text="Are you sure?" />
        ) : (
          <FormPost
            postInfo={localPostInfo.info}
            category={categories}
            onFinishFailed={handlerError}
            onFinish={localPostInfo.operation}
          />
        )}
      </Modal>
    </>
  );
};

export default PostList;
