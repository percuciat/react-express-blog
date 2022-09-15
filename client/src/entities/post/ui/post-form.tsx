import React, { useEffect, useMemo } from 'react';
import { Button, notification } from 'antd';
import { useAppDispatch, useAppSelector } from 'shared/hooks/useRedux';
import {
  createPost,
  updatePost,
  deletePost,
  setOpenModal,
  selectPostErrors,
  selectPostModalStatus,
  resetErrorsFromStore,
  selectPostInfoForModal,
  selectPostNotification,
  resetNotification,
} from 'entities/post';
import {
  AlertConfirm,
  ErrorAlert,
  Form,
  Input,
  Select,
  useForm,
  Field,
  Option,
  Modal,
  Notification,
} from 'shared/ui';
import { TypeCategory, TypePostStatus } from 'shared/api';

type TypePostFormProps = { categories: Array<TypeCategory> };
type TypeFormData = {
  title: string;
  content: string;
  category: number;
  status: TypePostStatus;
  updatedby?: string;
};

export const PostForm = (props: TypePostFormProps) => {
  const { categories } = props;
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const backendError = useAppSelector(selectPostErrors);
  const isOpenModal = useAppSelector(selectPostModalStatus);
  const postInfoForModal = useAppSelector(selectPostInfoForModal);
  const notification = useAppSelector(selectPostNotification);

  useEffect(() => {
    if (isOpenModal) {
      form.resetFields();
    }
  }, [form, isOpenModal]);

  const options = useMemo(() => {
    return categories.map((el) => ({ id: el.id, name: el.category_name, value: el.id }));
  }, [categories]);

  const handlerError = (e) => {
    console.log('e handleer', e);
  };

  const closeModal = () => {
    dispatch(setOpenModal(false));
    dispatch(resetErrorsFromStore(null));
  };

  const operations = {
    create: async (newPostFormData: TypeFormData) => {
      await dispatch(
        createPost({
          ...newPostFormData,
          status: TypePostStatus['No published'], // change when registration or login
          category_id: newPostFormData.category,
          author_id: 1, // change when registration or login
        })
      );
    },
    update: async (newPostFormData: TypeFormData) =>
      await dispatch(
        updatePost({
          id: postInfoForModal.info.id,
          ...newPostFormData,
          category_id: newPostFormData.category,
          status: TypePostStatus['No published'],
          updatedby: 'fox',
          author_id: 1,
        })
      ),
    delete: async () => await dispatch(deletePost(postInfoForModal.info.id)),
  };

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        // getContainer={false}
        //destroyOnClose
        text={postInfoForModal.titleModal}
        onCancel={closeModal}
      >
        {postInfoForModal.titleModal === 'Delete Post' ? (
          <AlertConfirm handler={operations.delete} text="Are you sure?" />
        ) : (
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            form={form}
            initialValues={{
              title: postInfoForModal.info.title,
              content: postInfoForModal.info.content,
              category: postInfoForModal.info.category?.value,
            }}
            onFinish={operations[postInfoForModal.operation]}
            onFinishFailed={handlerError}
          >
            <Field
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input title!',
                  whitespace: true,
                },
                {
                  min: 3,
                  message: 'Title must be more than 3 chars!',
                },
              ]}
            >
              <Input placeholder="Title post" />
            </Field>
            <Field
              label="Content"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Please input content!',
                  whitespace: true,
                },
                {
                  min: 5,
                  message: 'Content must be more than 5 chars!',
                },
              ]}
            >
              <Input placeholder="Content post" />
            </Field>
            <Field
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: 'Please input category!',
                },
              ]}
            >
              <Select style={{ width: 120 }}>
                {options.map((el: any) => {
                  return (
                    <Option key={el.id} value={el.value}>
                      {el.name}
                    </Option>
                  );
                })}
              </Select>
            </Field>
            <Field
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={Boolean(backendError)}>
                Submit
              </Button>
            </Field>
          </Form>
        )}

        {backendError && <ErrorAlert backendError={backendError} />}
      </Modal>
      {/* {notification && <div>allala</div>} */}
      {/*  {notification && (
        <Notification
          typeNotification={notification.type}
          duration={5}
          onClose={() => dispatch(resetNotification(null))}
          message={notification.message}
        />
      )} */}
    </>
  );
};
