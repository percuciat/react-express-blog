import React from 'react';
import { List, Skeleton } from 'antd';
import { TPostListItemProps } from '../../types';
import styled from 'styled-components';

const SPostAdditionalInfo = styled.div`
  display: flex;
  column-gap: 3rem;
`;

const PostListItem = (props: TPostListItemProps) => {
  const { elementList, postOperations } = props;
  const actionOperations = postOperations.map((actionComponent) => {
    actionComponent.props.onClick.bind(null, elementList)
    return actionComponent
  });

  return (
    <List.Item
      actions={actionOperations}
    >
      <Skeleton title={true} loading={elementList.loading} active>
        <List.Item.Meta title={elementList.title} description={elementList.content} />
        <SPostAdditionalInfo>
          <div>{elementList.createdAt}</div>
          <div>{elementList.category}</div>
        </SPostAdditionalInfo>
      </Skeleton>
    </List.Item>
  );
};

export default PostListItem;
