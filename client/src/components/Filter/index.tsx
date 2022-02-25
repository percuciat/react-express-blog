import React from 'react';
import { Select } from 'antd';

interface IFilter {
  options: Array<any>;
  handler: any;
}

const Filter = (props: IFilter) => {
  const { options, handler } = props;

  return (
    <>
      {
        <Select defaultValue="all" style={{ width: 120 }} onChange={handler}>
          <Select.Option value="">All</Select.Option>
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
