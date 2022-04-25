import React from 'react';
import { Button, Pagination } from 'antd';
import styled from 'styled-components';

const SFooter = styled.div`
  padding: 1rem 0;
  display: flex;
  column-gap: 2rem;
`;


const PostListFooter = (props) => {
  const {
    createPostHandler,
    paginationOptions,
    handlePaginationChange,
    postsData,
    handlePageSize,
  } = props;
  const paginationSizeIntervals = ['5', '10', '15', '20'];
  return (
    <SFooter>
      <Button type="primary" title="Create Post" onClick={createPostHandler}>
        Create
      </Button>
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

export default PostListFooter;
