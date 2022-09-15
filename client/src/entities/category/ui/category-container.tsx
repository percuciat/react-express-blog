import React from 'react';
import { Row } from 'antd';
import { Modal, ErrorAlert, AlertConfirm } from 'shared/ui';
import { CategoryList } from './category-list';
import { CategoryForm } from './category-form';
import { useAppSelector, useAppDispatch } from 'shared/hooks/useRedux';
import {
  selectCategoryErrors,
  selectCategoryModalStatus,
  setOpenModal,
  resetErrorsFromStore,
  deleteCategory,
  selectCategoryInfoForModal,
} from '../model';

export const CategoryContainer = (props) => {
  const dispatch = useAppDispatch();
  const backendError = useAppSelector(selectCategoryErrors);
  const isOpenModal = useAppSelector(selectCategoryModalStatus);
  const categoryInfoForModal = useAppSelector(selectCategoryInfoForModal);

  const closeModal = () => {
    dispatch(setOpenModal(false));
    dispatch(resetErrorsFromStore(null));
  };
  const deleteHandler = async () => {
    await dispatch(deleteCategory(categoryInfoForModal.info.id));
  };

  return (
    <>
      <Row align="middle" gutter={18}>
        <CategoryList />
      </Row>

      <Modal isOpen={isOpenModal} text={categoryInfoForModal.titleModal} onCancel={closeModal}>
        {categoryInfoForModal.operation === 'delete' ? (
          <AlertConfirm handler={deleteHandler} text="Are you sure?" />
        ) : (
          <CategoryForm />
        )}
        {backendError && <ErrorAlert backendError={backendError} />}
      </Modal>
    </>
  );
};
