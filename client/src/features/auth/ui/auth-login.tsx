import React from 'react';
import { Button, Form as AntdForm, Input, Checkbox } from 'antd';
import { Link, StyledFormAuthWrapper } from 'shared/ui/';

export const AuthLogin: any = (props: any) => {
  const onFinish = () => {};

  const onFinishFailed = () => {};
  return (
    <StyledFormAuthWrapper>
      <h1>Login</h1>
      <AntdForm
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <AntdForm.Item
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
        </AntdForm.Item>
        <AntdForm.Item
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
        </AntdForm.Item>
        <AntdForm.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </AntdForm.Item>

        <AntdForm.Item>
          <div style={{ display: 'flex', columnGap: '20px', alignItems: 'center' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="registration">Sign up</Link>
          </div>
        </AntdForm.Item>
      </AntdForm>
    </StyledFormAuthWrapper>
  );
};
