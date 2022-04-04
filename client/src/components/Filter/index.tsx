import React from 'react';
import { Select } from 'antd';

interface IFilter {
  options: Array<any>;
  defaultValue: string;
  handler: any;
}

const Filter = (props: IFilter) => {
  const { options, handler, defaultValue } = props;

  return (
    <>
      {
        <Select defaultValue={defaultValue} style={{ width: 120 }} onChange={handler}>
          <Select.Option value="all">All</Select.Option>
          {options.map((el: any) => {
            return (
              <Select.Option key={el._id} value={el.name}>
                {el.name}
              </Select.Option>
            );
          })}
        </Select>
      }
    </>
  );
};

export default Filter;
