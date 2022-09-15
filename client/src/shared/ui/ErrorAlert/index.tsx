import React from 'react';
import { Alert as AntdAlert, AlertProps } from 'antd';
import { TypeApiError } from 'shared/api';

type TypeErrorAlertProps = {
  backendError: TypeApiError;
};

export const ErrorAlert = (props: TypeErrorAlertProps) => {
  const { backendError } = props;
  if (Array.isArray(backendError.message)) {
    return (
      <>
        {backendError.message.map((errors) => {
          return (
            <AntdAlert
              message="Error"
              showIcon
              type="error"
              key={errors.param}
              description={errors.message}
            />
          );
        })}
      </>
    );
  }
  return <AntdAlert message="Error" showIcon type="error" description={backendError.message} />;
};
