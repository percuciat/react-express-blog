import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import {makeRequestXHR} from "../../api";
import {PostList} from "../../containers";

const PostPage = () => {
    const [posts, setPosts] = useState<any>([]);
    const [hasLoading, setHasLoading] = useState(false);

    useEffect(() => {
        setHasLoading(true)
        makeRequestXHR('get', {
            url: '/',
        }).then(r => {
            setHasLoading(false);
            setPosts(r.data)

        }).finally(() => {
            setHasLoading(false)
        })

    }, []);

    const cr = (newPostFormData) => {
        const {title, content} = newPostFormData;
        makeRequestXHR('post', {
            url: '/create',
            data: {
                title,
                content
            }
        }).then(r => {
            setHasLoading(false);
            setPosts(prevState => [...prevState, r.data])

        }).finally(() => {
            setHasLoading(false)
        })
    };

    const edit = (newPostFormData) => {
        const {title, content} = newPostFormData;
        makeRequestXHR('post', {
            url: '/create',
            data: {
                title,
                content
            }
        }).then(r => {
            setHasLoading(false);
            setPosts(prevState => [...prevState, r.data])

        }).finally(() => {
            setHasLoading(false)
        })
    }

    return (
        <>
            <Row align="middle">
                <Col span={6}>
                    <h1>PostPage</h1>
                </Col>
                <Col span={6}>

                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <PostList postsData={posts}
                              create={cr}
                              hasLoading={hasLoading}/>
                </Col>
            </Row>
        </>
    );
};

export default PostPage;