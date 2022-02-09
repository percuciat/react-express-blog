import React from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import {Link, Outlet} from "react-router-dom";

const PostPage = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <h1>PostPage</h1>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <Button type="primary">
                        create
                    </Button>
                </Col>
            </Row>


            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input title!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Please input content!',
                        },
                    ]}
                >
                    <Input/>
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
        </>
    );
};

export default PostPage;