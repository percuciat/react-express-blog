import React from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'shared/hooks/useRedux';
import { setLocalPostInfo } from '../../model';

export const PostItemCreate = (props) => {
  const isAuth = false;
  const dispatch = useAppDispatch();
  if (!isAuth) {
    return null;
  }

  const createPostHandler = () => {
    dispatch(
      setLocalPostInfo({
        info: {},
        operation: 'create',
        titleModal: 'Create Post',
      })
    );
  };
  return (
    <Button type="primary" title="Create Post" onClick={createPostHandler}>
      Create
    </Button>
  );
};
