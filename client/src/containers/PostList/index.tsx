import React, {useState} from 'react';
import {List, Button, Skeleton, Col} from "antd";
import {CloseCircleOutlined, EditOutlined, LoadingOutlined} from '@ant-design/icons';

type TEl = {_id: string, title: string, content: string};

const PostList = (props: any) => {
    const {setModal, setModalHeader, setOperationHandler, setPostInfo, postsData, deletePost, hasLoading, } = props;

    const editPost = ({_id, title, content, category}) => {
        setModal(true);
        setModalHeader('Edit Post');
        setPostInfo((prevState) => ({...prevState, _id, title, content, category}));
        setOperationHandler('edit')
    };

    const handlerDeletePost = ({_id}) => {
        setModal(true);
        setModalHeader('Delete Post');
        setOperationHandler('delete');
        setPostInfo((prevState) => ({...prevState, _id}));
        /*deletePost(_id)*/
    };

    const createPost = () => {
        setModal(true);
        setPostInfo({});
        setModalHeader('Create Post');
        setOperationHandler('create')
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
                  footer={<Button type="primary" onClick={createPost}>create</Button>}
                  renderItem={(el: any) => {
                      return (
                          <List.Item key={el._id} actions={[
                                      <EditOutlined className="postIcon"
                                                    style={{ fontSize: 25 }}
                                                    onClick={() => editPost(el)}/>,
                                      <CloseCircleOutlined className="postIcon"
                                                           style={{ fontSize: 25 }}
                                                           onClick={() => handlerDeletePost(el)}/>
                                       ]}>
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
        </>
    );
};

export default PostList;