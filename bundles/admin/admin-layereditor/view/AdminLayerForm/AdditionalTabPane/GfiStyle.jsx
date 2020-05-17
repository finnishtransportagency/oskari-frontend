import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Message, TextAreaInput } from 'oskari-ui';
import { Controller } from 'oskari-ui/util';
import { StyledFormField } from '../styled';
import { InfoTooltip } from '../InfoTooltip';

export const GfiStyle = ({ layer, controller }) => (
    <Fragment>
        <Message messageKey='gfiStyle'/>
        <InfoTooltip messageKeys='gfiStyleDesc'/>
        <StyledFormField>
            <TextAreaInput
                rows={4}
                value={layer.gfiXslt}
                onChange={(evt) => controller.setGfiXslt(evt.target.value)} />
        </StyledFormField>
    </Fragment>
);
GfiStyle.propTypes = {
    layer: PropTypes.object.isRequired,
    controller: PropTypes.instanceOf(Controller).isRequired
};
