import React, { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';

interface IFormPost {
  category: Array<any>;
  postInfo: any;
  onFinish: (valuesForm: any, otherPostInfo?: any) => void;
  onFinishFailed: (e: any) => any;
}

const PostForm = (props: IFormPost) => {
  const { postInfo, onFinish, onFinishFailed, category } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      title: postInfo.title,
      content: postInfo.content,
      category: postInfo.category,
    });
  }, [postInfo, form]);

  const submitForm = (formData) => {
    onFinish(formData, postInfo._id);
  };

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
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
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
      </Form.Item>
      <Form.Item
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
      </Form.Item>
      <Form.Item
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
          {category.map((el) => {
            return (
              <Select.Option key={el._id} value={el.name}>
                {el.name}
              </Select.Option>
            );
          })}
        </Select>
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

export default PostForm;
