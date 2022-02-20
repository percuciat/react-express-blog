import React, {useEffect, useState} from "react";
import {Select } from "antd";
import {makeRequestXHR} from "../../api";


interface IFilterPost {
    category: Array<any>;
    setPosts: (v: any) => void;
    setHasLoading: (v: boolean) => any;
}

const FilterPost = (props: IFilterPost) => {
    const {setPosts, setHasLoading, category} = props;

    const filterCategory = (value) => {
        setHasLoading(true)
        makeRequestXHR('get', {
            url: '/',
            params: {
                category: value
            }
        }).then(r => {
            setHasLoading(false);
            setPosts(r.data)

        }).finally(() => {
            setHasLoading(false)
        })
    };

    return <> {
               <Select defaultValue="all" style={{ width: 120 }} onChange={value => {
                    filterCategory(value);
                }}>
                    <Select.Option value="">All</Select.Option>
                    {
                        category.map((el: any) => {
                            return (
                                <Select.Option key={el._id}
                                               value={el.category}>{el.category}</Select.Option>
                            )
                        })
                    }
                </Select>
            }
            </>
};

export default FilterPost;
