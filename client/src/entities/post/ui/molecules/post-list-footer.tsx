import React from 'react';
import { Button, Pagination } from 'antd';
import styled from 'styled-components';

const SFooter = styled.div`
  padding: 1rem 0;
  display: flex;
  column-gap: 2rem;
`;

export const PostListFooter = (props) => {
  const { footerOperations, paginationOptions, handlePaginationChange, postsData, handlePageSize } =
    props;
  const paginationSizeIntervals = ['5', '10', '15', '20'];
  return (
    <SFooter>
      {footerOperations.createPostHandler && (
        <Button type="primary" title="Create Post" onClick={footerOperations.createPostHandler}>
          Create
        </Button>
      )}
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
    </SFooter>
  );
};
