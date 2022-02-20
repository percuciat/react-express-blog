import React, {useEffect} from "react";
import {Button, Form, Input, Select } from "antd";


interface IFormPost {
    category: Array<any>;
    postInfo: any;
    onFinish: (v: any) => void;
    onFinishFailed: () => any;
}

const FormPost = (props: IFormPost) => {
    const {postInfo, onFinish, onFinishFailed, category} = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            title: postInfo.title,
            content: postInfo.content,
            category: postInfo.category
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
                    {
                        category.map(el => {
                            return (
                                <Select.Option key={el._id}
                                               value={el.category}>{el.category}</Select.Option>
                            )
                        })
                    }

                </Select>
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
