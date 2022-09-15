import React, { useEffect } from 'react';
import { List } from 'antd';
import { PostListFooter } from './molecules/post-list-footer';
import { PostListItem } from './molecules/post-list-item';
import { StyledLoadingIndicator } from 'shared/ui';
import { TypePost } from 'shared/api';
import { useAppSelector } from 'shared/hooks/useRedux';
import { selectPostLoading, TypePostItem, selectPostListPagination } from '../model';

type TypePostListProps = { posts: Array<TypePost>; hasActions?: boolean };

export const PostList = (props: TypePostListProps) => {
  const { posts, hasActions } = props;
  const isPostLoading = useAppSelector(selectPostLoading);
  const paginationOptions = useAppSelector(selectPostListPagination);
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        locale={{
          emptyText: 'no Posts',
        }}
        loading={{
          spinning: isPostLoading,
          indicator: <StyledLoadingIndicator />,
        }}
        footer={
          hasActions && (
            <PostListFooter postsDataLength={posts.length} paginationOptions={paginationOptions} />
          )
        }
        renderItem={(el: TypePostItem, index) =>
          index >= paginationOptions.minIndex &&
          index < paginationOptions.maxIndex && (
            <PostListItem key={el.id} postItem={el} hasActions={hasActions} />
          )
        }
      ></List>
    </>
  );
};
