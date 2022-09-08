import React from 'react';
import { Select, Option } from '../Select';

interface IFilter {
  options: Array<any>;
  defaultValue: string;
  handler: any;
}

export const Filter = (props: IFilter) => {
  const { options, handler, defaultValue } = props;

  return (
    <>
      {
        <Select defaultValue={defaultValue} style={{ width: 120 }} onChange={handler}>
          <Option value="">All</Option>
          {options.map((el: any) => {
            return (
              <Option key={el._id} value={el.name}>
                {el.name}
              </Option>
            );
          })}
        </Select>
      }
    </>
  );
};
