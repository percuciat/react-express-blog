import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { PostListFooter } from './molecules/post-list-footer';
import { PostListItem } from './molecules/post-list-item';
import { StyledLoadingIndicator } from 'shared/ui/styles';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { selectPostLoading } from 'store/slices/post';
import { TPaginationOptions, TListElem, TPostListProps } from '../model/types';

const defaultState = {
  current: 1,
  minIndex: 0,
  maxIndex: 5,
  postsOnPage: 5,
};

export const PostList = (props: TPostListProps) => {
  const { posts, postElementOperations, footerOperations } = props;

  const hasLoading = useAppSelector(selectPostLoading);
  const [paginationOptions, setPaginationOptions] = useState<TPaginationOptions>(defaultState);

  useEffect(() => {
    setPaginationOptions(defaultState);
  }, [posts]);

  const handlePaginationChange = (page: number, size: number) => {
    setPaginationOptions({
      current: page,
      minIndex: (page - 1) * size,
      maxIndex: page * size,
      postsOnPage: size,
    });
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        locale={{
          emptyText: 'no Posts',
        }}
        loading={{
          spinning: hasLoading,
          indicator: <StyledLoadingIndicator />,
        }}
        footer={
          <PostListFooter
            handlePaginationChange={handlePaginationChange}
            postsData={posts}
            footerOperations={footerOperations}
            paginationOptions={paginationOptions}
          />
        }
        renderItem={(el: TListElem, index) =>
          index >= paginationOptions.minIndex &&
          index < paginationOptions.maxIndex && (
            <PostListItem
              key={el._id}
              elementList={el}
              postOperations={postElementOperations}
              /*   deletePostHandler={deletePostHandler}
              updatePostHandler={updatePostHandler} */
            />
          )
        }
      ></List>
    </>
  );
};
