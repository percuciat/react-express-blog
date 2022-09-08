import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';
import { PostItemCreate } from '../atoms/post-item-create';

const StyledPostFooter = styled.div`
  padding: 1rem 0;
  display: flex;
  column-gap: 2rem;
`;

export const PostListFooter = (props) => {
  const { paginationOptions, handlePaginationChange, postsData, handlePageSize } = props;
  const paginationSizeIntervals = ['5', '10', '15', '20'];

  return (
    <StyledPostFooter>
      <PostItemCreate />
      {postsData.length > paginationSizeIntervals[0] && (
        <Pagination
          current={paginationOptions.current}
          defaultCurrent={1}
          showSizeChanger
          pageSizeOptions={paginationSizeIntervals}
          pageSize={paginationOptions.postsOnPage}
          onChange={handlePaginationChange}
          onShowSizeChange={handlePageSize}
          total={postsData.length}
        />
      )}
    </StyledPostFooter>
  );
};
