import React, { useEffect } from 'react';
import { Select, Option } from '../Select';

type TypeFilter = {
  options: Array<any>;
  defaultValue?: string;
  hasAll?: boolean;
  handler?: any;
};

type TypeFilterOption = {
  id: string;
  name: string;
  value: string;
};

export const Filter = (props: TypeFilter) => {
  const { options, handler, hasAll = true, defaultValue } = props;

  return (
    <>
      {
        <Select defaultValue={defaultValue} style={{ width: 120 }} onChange={handler}>
          <>
            {hasAll && <Option value="">All</Option>}
            {options.map((el: TypeFilterOption) => {
              return (
                <Option key={el.id} value={el.value}>
                  {el.name}
                </Option>
              );
            })}
          </>
        </Select>
      }
    </>
  );
};
