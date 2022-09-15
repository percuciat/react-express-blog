import React from 'react';
import { Link } from 'shared/ui';
import { Result } from 'antd';

export const NotFound: any = () => {
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
