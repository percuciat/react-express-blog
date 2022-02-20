import React, {useEffect, useState} from 'react';
import {Row, Col, Spin, Button} from 'antd';
import {makeRequestXHR} from "../../api";
import {PostList} from "../../containers";
import {FormPost, Modal, FilterPost} from "../../components";
import { LoadingOutlined } from '@ant-design/icons';

const PostPage = () => {
    const [category, setCategory] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [posts, setPosts] = useState<any>([]);
    const [hasLoading, setHasLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalHeaderText, setModalHeaderText] = useState('');
    const [postInfo, setPostInfo] = useState<any>({});
    const [operationHandler, setOperationHandler] = useState('create');

    const closeModal = () => {
        setShowModal(false)
    };

    const handlerError = () => {

    }

    useEffect(() => {
        setHasLoading(true)
        makeRequestXHR('get', {
            url: '/',
           /* params: {
                count: 4,
                filter: 'desc'
            }*/
        }).then(r => {
            setHasLoading(false);
            setPosts(r.data)

        }).finally(() => {
            setHasLoading(false)
        })

    }, []);

    useEffect(() => {
        setLoadingCategory(true);
        makeRequestXHR('get', {
            url: '/category',
        }).then(r => {
            setLoadingCategory(false);
            setCategory(r.data)

        }).finally(() => {
            setLoadingCategory(false)
        })
    }, []);

    const create = (newPostFormData) => {
        setHasLoading(true)
        const {title, content, category} = newPostFormData;
        makeRequestXHR('post', {
            url: '/create',
            data: {
                title,
                content,
                category
            }
        }).then(r => {
            setHasLoading(false);
            setShowModal(false);
            setPosts(prevState => [...prevState, r.data])

        }).finally(() => {
            setHasLoading(false)
        })
    };

    const update = (newPostFormData) => {
        setHasLoading(true)
        const {_id} = postInfo as {_id: string};
        const {title, content, category} = newPostFormData;
        makeRequestXHR('put', {
            url: '/update',
            data: {
                _id,
                title,
                content,
                category
            }
        }).then(r => {
            setHasLoading(false);
            setShowModal(false);
            setPosts(prev => prev.map(el => {
                if(el._id === r.data._id) {
                    return r.data
                }
                return el
            }))

        }).finally(() => {
            setHasLoading(false)
        })
    };

    const deletePost = () => {
        setShowModal(false);
        setHasLoading(true);
        makeRequestXHR('delete', {
            url: '/delete',
            data: {
                _id: postInfo._id,
            }
        }).then(r => {
            setHasLoading(false);
            setPosts(prev => prev.filter(el => el._id !== postInfo._id))
        }).catch(e => {
            console.log('error', e)
        })
            .finally(() => {
                setHasLoading(false)
            })
    };


    return (
        <>
            <Row align="middle">
                <Col span={6}>
                    <h1>PostPage</h1>
                </Col>
                <Col span={6}>
                    {loadingCategory ?
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> :
                        <FilterPost category={category}
                            setPosts={setPosts}
                            setHasLoading={setHasLoading}/>
                    }
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <PostList postsData={posts}
                              deletePost={deletePost}
                              setModalHeader={setModalHeaderText}
                              setModal={setShowModal}
                              setPostInfo={setPostInfo}
                              setOperationHandler={setOperationHandler}
                              hasLoading={hasLoading}/>
                </Col>
            </Row>
            <Modal isVisible={showModal}
                   text={modalHeaderText}
                   handlerCancel={closeModal}>
                {
                    operationHandler === 'delete' ?
                        <div>
                            <p>Are you sure?</p>
                            <Button danger onClick={deletePost}>Delete</Button>
                        </div> :
                        <FormPost postInfo={postInfo}
                                category={category}
                                onFinishFailed={handlerError}
                                onFinish={operationHandler === 'create' ? create : update}/>
                }
            </Modal>
        </>
    );
};

export default PostPage;