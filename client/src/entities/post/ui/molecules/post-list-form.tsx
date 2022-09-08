import React, { useEffect } from 'react';
import { Button, notification } from 'antd';
import { useAppDispatch } from 'shared/hooks/useRedux';
import { createPost, updatePost, deletePost, setOpenModal, TypePostListForm } from 'entities/post';
import { AlertConfirm, Form, Input, Select, useForm, Field, Option } from 'shared/ui';

export const PostListForm = (props: TypePostListForm) => {
  const { postInfoForModal, categories } = props;
  const [form] = useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      title: postInfoForModal.info.title,
      content: postInfoForModal.info.content,
      /* category: postInfo.category, */
    });
  }, [postInfoForModal, form]);

  const submitForm = (formData) => {
    operations[postInfoForModal.operation](formData, postInfoForModal.info.id);
  };

  const handlerError = (e) => {
    console.log('e handleer', e);
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const operations = {
    create: async (newPostFormData) => {
      const response = await dispatch(createPost(newPostFormData));
      if (response.payload.status !== 'Error') {
        setOpenModal(false);
        openNotification('success', 'Post has created!');
      }
    },
    update: async (newPostFormData, otherInfo) => {
      const response = await dispatch(updatePost({ ...newPostFormData, id: otherInfo }));
      if (response.payload.status !== 'Error') {
        setOpenModal(false);
        openNotification('success', 'Post has updated!');
      }
    },
    delete: async () => {
      const response = await dispatch(deletePost(postInfoForModal.info.id));
      if (response.payload.status !== 'Error') {
        setOpenModal(false);
        openNotification('success', 'Post has deleted!');
      }
    },
  };

  if (postInfoForModal.titleModal === 'Delete Post') {
    return <AlertConfirm handler={operations.delete} text="Are you sure?" />;
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      form={form}
      onFinish={submitForm}
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
          {categories.map((el) => {
            return (
              <Option key={el.id} value={el.category_name}>
                {el.category_name}
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Field>
    </Form>
  );
};
