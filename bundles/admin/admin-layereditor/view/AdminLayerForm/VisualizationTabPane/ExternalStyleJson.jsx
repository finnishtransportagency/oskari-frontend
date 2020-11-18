import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'oskari-ui';
import { Controller } from 'oskari-ui/util';
import { StyledFormField } from './styled';
import { JsonInput } from '../JsonInput';
import { InfoTooltip } from '../InfoTooltip';

const template =
`{
    "My external json style": { ... },
    ...
}`;
export const ExternalStyleJson = ({ layer, controller }) => (
    <Fragment>
        <Message messageKey='externalStylesJSON'/>
        <InfoTooltip message={
            <Fragment>
                <pre>{template}</pre>
                <Message messageKey='externalStyleFormats'/>
            </Fragment>
        }/>
        <StyledFormField>
            <JsonInput
                rows={6}
                value={layer.tempExternalStylesJSON}
                onChange={evt => controller.setExternalStyleJSON(evt.target.value)} />
        </StyledFormField>
    </Fragment>
);
ExternalStyleJson.propTypes = {
    layer: PropTypes.object.isRequired,
    controller: PropTypes.instanceOf(Controller).isRequired
};
