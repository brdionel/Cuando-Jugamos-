import React, { useState } from 'react'
import { Badge } from 'antd';
import { Select } from 'antd';
const { Option } = Select;


const SelectInput = (props) => {
    const { options } = props;
    return (
        <Select
            defaultValue={options[0].value}
            style={{ width: '100%' }}
            onChange={(option) => props.handleChange(option)}
        >
            {
                options.map(item => (
                    <Option value={item.value}>
                        <Badge color={item.value} text={item.text} />
                    </Option>

                ))
            }

        </Select>



    )
}

export  default SelectInput;
