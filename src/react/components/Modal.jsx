import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntModal } from 'antd';
import 'antd/es/modal/style/index.js';

export const Modal = ({ children, ...other }) => (
    <AntModal zIndex={ 55500 } {...other}>
        {children}
    </AntModal>
);

Modal.propTypes = {
    children: PropTypes.any
};
