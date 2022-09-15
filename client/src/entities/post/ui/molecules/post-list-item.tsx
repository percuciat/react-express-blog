import React from 'react';
import { List, Skeleton } from 'antd';
import { TypePostItem } from '../../model/types';
import { PostItemEdit } from '../atoms/post-item-edit';
import { PostItemDelete } from '../atoms/post-item-delete';
import { dateFormater } from 'shared/lib';
import styled from 'styled-components';

type TypeListItemProps = {
  postItem: TypePostItem & { loading?: boolean };
  hasActions?: boolean;
};

const StyledPostAdditionalInfo = styled.div`
  display: flex;
  column-gap: 3rem;
`;

export const PostListItem = (props: TypeListItemProps) => {
  const { postItem, hasActions = false } = props;
  const postDate = dateFormater(postItem.createdAt);
  const actions = hasActions
    ? [<PostItemEdit el={postItem} />, <PostItemDelete el={postItem} />]
    : [];
  return (
    <List.Item actions={actions}>
      <Skeleton title loading={postItem.loading} active>
        <List.Item.Meta title={postItem.title} description={postItem.content} />
        <StyledPostAdditionalInfo>
          <div>{postDate}</div>
          <div>{postItem.post_category.category_name}</div>
        </StyledPostAdditionalInfo>
      </Skeleton>
    </List.Item>
  );
};
