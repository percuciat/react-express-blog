import React from 'react';
import { Button } from 'antd';

const Alert = (props: any) => {
  const { text, handler } = props;
  return (
    <div>
      <p>{text}</p>
      <Button danger onClick={handler}>
        Delete
      </Button>
    </div>
  );
};

export default Alert;
