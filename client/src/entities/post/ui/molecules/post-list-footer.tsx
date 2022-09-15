import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';
import { PostItemCreate } from '../atoms/post-item-create';
import { useAppDispatch } from 'shared/hooks/useRedux';
import { setPostListPagination, TypePaginationOptions } from '../../model';

type PostListFooterProps = {
  paginationOptions: TypePaginationOptions;
  postsDataLength: number;
};

const StyledPostFooter = styled.div`
  padding: 1rem 0;
  display: flex;
  column-gap: 2rem;
`;

export const PostListFooter = (props: PostListFooterProps) => {
  // , handlePageSize
  const { paginationOptions, postsDataLength } = props;
  const dispatch = useAppDispatch();
  const paginationSizeIntervals = [5, 10, 15, 20];
  const paginationSizeDefaultInterval = paginationSizeIntervals[0];

  const handlePaginationChange = (page: number, size: number) => {
    dispatch(
      setPostListPagination({
        current: page,
        minIndex: (page - 1) * size,
        maxIndex: page * size,
        postsOnPage: size,
      })
    );
  };

  return (
    <StyledPostFooter>
      <PostItemCreate />
      {postsDataLength > paginationSizeDefaultInterval && (
        <Pagination
          current={paginationOptions.current}
          defaultCurrent={1}
          showSizeChanger
          pageSizeOptions={paginationSizeIntervals}
          pageSize={paginationOptions.postsOnPage}
          onChange={handlePaginationChange}
          /* onShowSizeChange={handlePageSize} */
          total={postsDataLength}
        />
      )}
    </StyledPostFooter>
  );
};
