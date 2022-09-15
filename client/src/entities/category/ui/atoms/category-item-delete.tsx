import React from 'react';
import { DeleteTwoTone } from '@ant-design/icons';
import { useAppDispatch } from 'shared/hooks/useRedux';
import {
  setOpenModal,
  setLocalCategoryInfo,
} from '../../model';

export const CategoryItemDelete = (props) => {
  const isAuth = true;
  const { el } = props;
  const dispatch = useAppDispatch();
  if (!isAuth) {
    return null;
  }
  const deleteCategory = () => {
    dispatch(
      setLocalCategoryInfo({
        info: {
          id: el.id,
        },
        operation: 'delete',
        titleModal: 'Delete category',
      })
    );
    dispatch(setOpenModal(true));
  };
  return <DeleteTwoTone title="Delete category" onClick={deleteCategory} />;
};
