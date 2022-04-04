import React from 'react';
import { List, Skeleton } from 'antd';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';

const PostListItem = (props) => {
  const { elementList, deletePostHandler, updatePostHandler } = props;

  return (
    <List.Item
      key={elementList._id}
      actions={[
        <EditOutlined
          title="Edit post"
          className="postIcon"
          style={{ fontSize: 25 }}
          onClick={() => updatePostHandler(elementList)}
        />,
        <CloseCircleOutlined
          title="Delete post"
          className="postIcon"
          style={{ fontSize: 25 }}
          onClick={() => deletePostHandler(elementList)}
        />,
      ]}
    >
      <Skeleton title={true} loading={elementList.loading} active>
        <List.Item.Meta title={elementList.title} description={elementList.content} />
        <div>content long content</div>
      </Skeleton>
    </List.Item>
  );
};

export default PostListItem;
