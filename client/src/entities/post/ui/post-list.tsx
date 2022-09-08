import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { PostListFooter } from './molecules/post-list-footer';
import { PostListItem } from './molecules/post-list-item';
import { PostListForm } from './molecules/post-list-form';
import { StyledLoadingIndicator, Alert, Modal } from 'shared/ui';
import { useAppSelector, useAppDispatch } from 'shared/hooks/useRedux';
import {
  selectPostLoading,
  TypePaginationOptions,
  TypeListItem,
  TypePostList,
  selectPostErrors,
  resetErrorsFromStore,
  selectPostModalStatus,
  selectPostInfoForModal,
  setOpenModal,
} from '../model';

const defaultState = {
  current: 1,
  minIndex: 0,
  maxIndex: 5,
  postsOnPage: 5,
};

export const PostList = (props: TypePostList) => {
  const { posts, categories } = props;
  const hasLoading = useAppSelector(selectPostLoading);
  const backendErrors = useAppSelector(selectPostErrors);
  const isOpenModal = useAppSelector(selectPostModalStatus);
  const postInfoForModal = useAppSelector(selectPostInfoForModal);
  const [paginationOptions, setPaginationOptions] = useState<TypePaginationOptions>(defaultState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPaginationOptions(defaultState);
  }, [posts]);

  const closeModal = () => {
    dispatch(setOpenModal(false));
    if (backendErrors.status) {
      dispatch(resetErrorsFromStore());
    }
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
          indicator: <StyledLoadingIndicator />,
        }}
        footer={
          <PostListFooter
            handlePaginationChange={handlePaginationChange}
            postsData={posts}
            paginationOptions={paginationOptions}
          />
        }
        renderItem={(el: TypeListItem, index) =>
          index >= paginationOptions.minIndex &&
          index < paginationOptions.maxIndex && <PostListItem key={el._id} postItem={el} />
        }
      ></List>

      <Modal isVisible={isOpenModal} text={postInfoForModal.titleModal} onCancel={closeModal}>
        <>
          <PostListForm categories={categories} postInfoForModal={postInfoForModal} />
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
