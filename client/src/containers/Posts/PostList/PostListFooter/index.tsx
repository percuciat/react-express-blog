import React, { useState } from 'react';
import { Button, Pagination } from 'antd';

const PostListFooter = (props) => {
  const { createPostHandler } = props;
  const [page, setPage] = useState(1);

  return (
    <div>
      <Button type="primary" title="Create Post" onClick={createPostHandler}>
        Create
      </Button>
      <Pagination simple defaultCurrent={page} total={5} />
    </div>
  );
};

export default PostListFooter;
