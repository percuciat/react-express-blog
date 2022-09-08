import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

export const CategoryForm = (props: any) => {
  const { handler, errorHandler } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [form]);

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
      onFinish={handler}
      onFinishFailed={errorHandler}
    >
      <Form.Item
        label="Category name"
        name="category"
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
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
