import React, { useEffect, useState, useCallback } from 'react';
import { Col, Spin, Card } from 'antd';
import { StyledLoadingIndicator } from 'shared/ui';
import { CategoryItemDelete } from './atoms/category-item-delete';

import { useAppSelector, useAppDispatch } from 'shared/hooks/useRedux';
import { selectIsLoading, selectCategoryData, fetchCategories } from '../model';

export const CategoryList = (props: any) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectIsLoading);
  const categories = useAppSelector(selectCategoryData);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spin tip="Loading..." indicator={<StyledLoadingIndicator />} />
      ) : (
        categories.map((category) => {
          return (
            <Col span={8} key={category.id}>
              <Card
                hoverable
                actions={[<CategoryItemDelete el={category} />]}
                cover={
                  <img
                    alt="example img"
                    /*  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" */
                  />
                }
              >
                <Card.Meta title={category.category_name} description="www.instagram.com" />
              </Card>
            </Col>
          );
        })
      )}
    </>
  );
};
