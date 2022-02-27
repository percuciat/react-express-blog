import React from 'react';
import { Button } from '_antd';

const AlertConfirm = (props: any) => {
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

export default AlertConfirm;
