import React from 'react';
import { Link } from 'react-router-dom';
import { Result } from 'antd';

const Empty404: any = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/" type="primary">
          Back Home
        </Link>
      }
    />
  );
};

export default Empty404;
