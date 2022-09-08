import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { setLocalPostInfo } from '../../model';
import { useAppDispatch } from 'shared/hooks/useRedux';

export const PostItemEdit = (props) => {
  const isAuth = false;
  const dispatch = useAppDispatch();
  if (!isAuth) {
    return null;
  }

  const updatePostHandler = (value) => {
    dispatch(
      setLocalPostInfo({
        info: {
          ...value,
        },
        operation: 'update',
        titleModal: 'Edit Post',
      })
    );
  };
  return (
    <EditOutlined
      title="Edit post"
      className="postIcon"
      style={{ fontSize: 25 }}
      onClick={updatePostHandler}
    />
  );
};
