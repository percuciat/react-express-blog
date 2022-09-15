import React, { useEffect } from 'react';
import notification, { ArgsProps } from 'antd/lib/notification';

interface TypeNotification extends ArgsProps {
  typeNotification: string;
  message: string;
}
export const Notification = (props: TypeNotification) => {
  const { typeNotification, message } = props;

  notification[typeNotification]({
    ...props,
    message: message,
  });

  return <></>;
};
