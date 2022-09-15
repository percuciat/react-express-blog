import React from 'react';
import { Button } from 'shared/ui';

export const AlertConfirm = (props: any) => {
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