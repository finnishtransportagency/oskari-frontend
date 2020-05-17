import React from 'react';
import PropTypes from 'prop-types';
import { Collapse as AntCollapse } from 'antd';
import styled from 'styled-components';
import 'antd/es/collapse/style/index.js';

// Collapse component passes some extra properties to its panels.
// When creating a custom Panel, those properties have to be carried.
// See usage example in bundles/framework/layerlist/view/LayerCollapse.jsx
export const Collapse = ({ children, ...other }) => (
    <AntCollapse {...other}>
        {children}
    </AntCollapse>
);

const TrimmedPanel = styled(AntCollapse.Panel)`
    > .ant-collapse-content {
        width: 100%;
        > .ant-collapse-content-box {
            padding: 0;
            margin: 0;
        }
    }
`;
export const Panel = ({ trimmed, ...other }) => {
    const Component = trimmed === true ? TrimmedPanel : AntCollapse.Panel;
    return <Component {...other}></Component>;
};

Collapse.propTypes = {
    children: PropTypes.any
};

Panel.propTypes = {
    children: PropTypes.any,
    trimmed: PropTypes.bool
};
