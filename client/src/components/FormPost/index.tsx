import {Button, Form, Input } from "antd";
import React, {useEffect} from "react";

interface IFormPost {
    postInfo: any;
    onFinish: (v: any) => void;
    onFinishFailed: () => any;
}

const FormPost = (props: IFormPost) => {
    const {postInfo, onFinish, onFinishFailed} = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            title: postInfo.title,
            content: postInfo.content
        });
    }, [postInfo]);

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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item label="Title"
                          name="title"
                       rules={[
                           {
                               required: true,
                               message: 'Please input title!',
                           },
                       ]}
            >
                <Input placeholder="Title post"/>
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
                <Input placeholder="Content post"/>
            </Form.Item>
            <Form.Item wrapperCol={{
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

export default FormPost;
