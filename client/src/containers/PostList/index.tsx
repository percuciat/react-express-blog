import React, {useState} from 'react';
import {List, Button, Skeleton, Col} from "antd";
import {CloseCircleOutlined, EditOutlined, LoadingOutlined} from '@ant-design/icons';
import {Modal, FormPost} from "../../components";
import {makeRequestXHR} from "../../api";

const PostList = (props: any) => {
    const {postsData, hasLoading, create} = props;
    const [show, setShow] = useState(false);
    const [postInfo, setPostInfo] = useState({});
    const [modalHeaderText, setModalHeaderText] = useState('');

    const createPost = (v) => {
        setShow(false)
        create(v)
    };

    const editPost = ({title, content}) => {
        setShow(true);
        setModalHeaderText('Edit Post');
        setPostInfo((prevState) => ({...prevState, title, content}));
    };

    const deletePost = () => {

    };

    const showModal = () => {
        setShow(true);
        setPostInfo({})
        setModalHeaderText('Create Post');
    };

    const handlerError = () => {

    }

    const closeModal = () => {
        setShow(false)
    };

    return (
        <>
            <List className="demo-loadmore-list" itemLayout="horizontal"
                  dataSource={postsData}
                  locale={{
                      emptyText: 'no Posts',
                  }}
                  loading={{
                      spinning: hasLoading,
                      indicator: <LoadingOutlined  style={{ fontSize: 25 }}/>
                  }}
                  footer={<Button type="primary" onClick={showModal}>create</Button>}
                  renderItem={(el: any) => {
                      return (
                          <List.Item
                              actions={
                                  [
                                      <EditOutlined className="postIcon"
                                                    style={{ fontSize: 25 }}
                                                    onClick={() => editPost(el)}/>,
                                      <CloseCircleOutlined className="postIcon"
                                                           style={{ fontSize: 25 }}
                                                           onClick={deletePost}/>
                                  ]}
                          >
                              <Skeleton title={true} loading={el.loading} active>
                                  <List.Item.Meta
                                      title={el.title}
                                      description={el.content}
                                  />
                                  <div>content long content</div>
                              </Skeleton>
                          </List.Item>
                      )
                  }}>
            </List>
            <Modal isVisible={show}
                   text={modalHeaderText}
                   handlerOk={showModal}
                   handlerCancel={closeModal}>
                <FormPost postInfo={postInfo}
                          onFinishFailed={handlerError}
                          onFinish={createPost}/>
            </Modal>
        </>
    );
};

export default PostList;