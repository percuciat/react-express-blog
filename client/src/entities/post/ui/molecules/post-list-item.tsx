import React from 'react';
import { List, Skeleton } from 'antd';
import { TypePostListItem } from '../../model/types';
import { PostItemEdit } from '../atoms/post-item-edit';
import { PostItemDelete } from '../atoms/post-item-delete';
import styled from 'styled-components';

const StyledPostAdditionalInfo = styled.div`
  display: flex;
  column-gap: 3rem;
`;

export const PostListItem = (props: TypePostListItem) => {
  const { postItem } = props;
  return (
    <List.Item
      actions={[
        <PostItemEdit />,
        <PostItemDelete />,
      ]}
    >
      <Skeleton title loading={postItem.loading} active>
        <List.Item.Meta title={postItem.title} description={postItem.content} />
        <StyledPostAdditionalInfo>
          <div>{postItem.createdAt}</div>
          <div>{postItem.category}</div>
        </StyledPostAdditionalInfo>
      </Skeleton>
    </List.Item>
  );
};
