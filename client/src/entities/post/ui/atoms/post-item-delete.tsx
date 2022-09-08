import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { setLocalPostInfo } from '../../model';
import { useAppDispatch } from 'shared/hooks/useRedux';

export const PostItemDelete = (props) => {
  const isAuth = false;
  const dispatch = useAppDispatch();
  if (!isAuth) {
    return null;
  }

  const deletePostHandler = (elemList) => {
    dispatch(
      setLocalPostInfo({
        info: { id: elemList.id },
        operation: 'delete',
        titleModal: 'Delete Post',
      })
    );
  };
  return (
    <CloseCircleOutlined
      title="Delete post"
      className="postIcon"
      style={{ fontSize: 25 }}
      onClick={deletePostHandler}
    />
  );
};
