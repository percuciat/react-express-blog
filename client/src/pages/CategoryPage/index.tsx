import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Form, Input, Spin, Card } from "antd";
import {makeRequestXHR} from "../../api";
import { LoadingOutlined, DeleteTwoTone } from '@ant-design/icons';
import {Modal} from "../../components";


const CategoryPage: any = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false)
    };
    useEffect(() => {
        setLoading(true)
        makeRequestXHR('get', {
            url: '/category',
        }).then(r => {
            setLoading(false);
            setCategory(r.data)

        }).finally(() => {
            setLoading(false)
        })
    }, []);

    const createCategory = (newCategoryFormData) => {
        const { category } = newCategoryFormData;
        setLoading(true);
        makeRequestXHR('post', {
            url: '/category/create',
            data: {
                category
            }
        }).then(r => {
            setLoading(false);
            setShowModal(false);
            setCategory(prevState => [...prevState, r.data])

        }).finally(() => {
            setLoading(false)
        })
    };

    const deleteCategory = (_id) => {
        setLoading(true);
        makeRequestXHR('delete', {
            url: '/category/delete',
            data: {
                _id
            }
        }).then(r => {
            setLoading(false);
            setCategory(prevState => prevState.filter(el => el._id !== _id))

        }).finally(() => {
            setLoading(false)
        })
    };


    const onFinishFailed = (r) => {
        console.log('Error', r)
    }

    return (
        <>
            <Row align="middle">
                <Col span={10}>
                    <h1>CategoryPage</h1>
                </Col>
                <Col span={2}>
                    <Button onClick={() => setShowModal(true)}>
                        Create
                    </Button>
                </Col>
            </Row>
            <Row gutter={16} >
                {
                    loading ?
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        : category.map(el => {
                            return (
                                <Col span={8} key={el._id}>
                                    <Card
                                        hoverable
                                        actions={[
                                            <DeleteTwoTone onClick={() => deleteCategory(el._id)}/>
                                        ]}
                                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                    >
                                        <Card.Meta title={el.category} description="www.instagram.com" />
                                    </Card>
                                </Col>
                            )
                    })
                }
            </Row>
            <Modal isVisible={showModal}
                   text="Create new Category"
                   handlerCancel={closeModal}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={createCategory}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Category name"
                               name="category"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input category name!',
                                   },
                               ]}
                    >
                        <Input placeholder="Title post"/>
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
            </Modal>
        </>
    );
};

export default CategoryPage;