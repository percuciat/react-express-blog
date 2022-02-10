import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import {makeRequestXHR} from "../../api";
import {Post} from "../../components";

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        makeRequestXHR('get', {
            url: '/',
        }).then(r => {
            console.log('RR', r)
            setPosts(r.data)
        })

    }, [])
    const onFinish = async (values: any) => {
        const responseServer = await makeRequestXHR('post', {
            url: '/create',
            data: values
        });
        console.log('Success:', responseServer);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <h1>PostPage</h1>
            <ul>
                {
                    posts.map((el: any) => {
                        return <Post key={el.title} title={el.title}
                                     content={el.content}/>
                    })
                }
            </ul>

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
                <Form.Item label="Title" name="title"
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
        </>
    );
};

export default PostPage;