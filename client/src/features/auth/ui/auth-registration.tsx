import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, StyledFormAuthWrapper } from 'shared/ui/';

export const AuthRegistration = () => {
  const onFinish = () => {};

  const onFinishFailed = () => {};

  const confirmPasswordsHandle = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }

      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    },
  });

  return (
    <StyledFormAuthWrapper>
      <h1>Registration</h1>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="user_name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="user_email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="user_password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            confirmPasswordsHandle,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', columnGap: '20px', alignItems: 'center' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="/">Sign in</Link>
          </div>
        </Form.Item>
      </Form>
    </StyledFormAuthWrapper>
  );
};
