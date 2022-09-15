import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { setLocalPostInfo, TypePostItem, setOpenModal } from '../../model';
import { useAppDispatch } from 'shared/hooks/useRedux';

type TypePostItemEditProps = {
  el: TypePostItem;
};

export const PostItemEdit = (props: TypePostItemEditProps) => {
  const { el } = props;
  const isAuth = true;
  const dispatch = useAppDispatch();
  if (!isAuth) {
    return null;
  }

  const updatePostHandler = () => {
    dispatch(
      setLocalPostInfo({
        info: {
          id: el.id,
          title: el.title,
          content: el.content,
          category: {
            name: el.post_category.category_name,
            value: el.post_category.id,
          },
        },
        operation: 'update',
        titleModal: 'Edit Post',
      })
    );
    dispatch(setOpenModal(true));
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
