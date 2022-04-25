import React from 'react';
import { List, Skeleton } from 'antd';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import { TPostListItemProps } from '../../types';
import styled from 'styled-components';

const SPostAdditionalInfo = styled.div`
  display: flex;
  column-gap: 3rem;
`;

const PostListItem = (props: TPostListItemProps) => {
  const { elementList, deletePostHandler, updatePostHandler } = props;

  return (
    <List.Item
      /* key={elementList._id} */
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
          onClick={() => deletePostHandler(elementList._id)}
        />,
      ]}
    >
      <Skeleton title={true} loading={elementList.loading} active>
        <List.Item.Meta title={elementList.title} description={elementList.content} />
        <SPostAdditionalInfo>
          <div>{elementList.createdAt}</div>
          <div>{elementList.category}</div>
        </SPostAdditionalInfo>
      </Skeleton>
    </List.Item>
  );
};

export default PostListItem;
