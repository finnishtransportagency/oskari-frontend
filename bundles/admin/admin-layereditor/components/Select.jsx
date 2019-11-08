import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntSelect } from 'antd';
import 'antd/es/select/style/';

export const Select = ({children, ...other}) => {
    return (
        <AntSelect {...other}>
            {
                children.map(c => {
                    const {children, ...other} = c.props;
                    return (
                        <AntSelect.Option key={c.key} {...other}>{children}</AntSelect.Option>
                    );
                })
            }
        </AntSelect>
    );
};

export const Option = ({children, ...other}) => (
    <AntSelect.Option {...other}>
        {children}
    </AntSelect.Option>
);

Select.propTypes = {
    children: PropTypes.any
};

Option.propTypes = {
    children: PropTypes.any
};
