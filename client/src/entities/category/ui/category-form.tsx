import React, { useEffect } from 'react';
import { Button, Form, useForm, Field, Input } from 'shared/ui';
import { useAppSelector, useAppDispatch } from 'shared/hooks/useRedux';
import { selectCategoryErrors, selectCategoryModalStatus, createCategory } from '../model';

export const CategoryForm = (props: any) => {
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector(selectCategoryModalStatus);
  const [form] = useForm();

  const onFinishFailed = (r) => {
    console.log('Error', r);
  };

  const create = async (newCategoryFormData) => {
    const { category_name } = newCategoryFormData;
    await dispatch(createCategory({
      category_name,
      author_id: 1
    }));
  };

  useEffect(() => {
    if(isOpenModal) {
      form.resetFields();
    }
  }, [form, isOpenModal]);

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
      onFinish={create}
      onFinishFailed={onFinishFailed}
    >
      <Field
        label="Category name"
        name="category_name"
        rules={[
          {
            required: true,
            message: 'Please input category name!',
          },
          {
            min: 5,
            message: 'Title category must be more than 5 chars!',
          },
        ]}
      >
        <Input placeholder="Title category" />
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
