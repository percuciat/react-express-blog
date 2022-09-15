import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { setLocalPostInfo, setOpenModal, TypePostItem } from '../../model';
import { useAppDispatch } from 'shared/hooks/useRedux';

type TypePostItemDeleteProps = {
  el: TypePostItem;
};

export const PostItemDelete = (props: TypePostItemDeleteProps) => {
  const { el } = props;
  const isAuth = true;
  const dispatch = useAppDispatch();
  if (!isAuth) {
    return null;
  }

  const deletePostHandler = () => {
    dispatch(
      setLocalPostInfo({
        info: { id: el.id },
        operation: 'delete',
        titleModal: 'Delete Post',
      })
    );
    dispatch(setOpenModal(true));
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
