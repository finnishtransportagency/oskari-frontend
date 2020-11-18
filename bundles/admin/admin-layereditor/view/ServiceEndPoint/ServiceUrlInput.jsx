import React from 'react';
import PropTypes from 'prop-types';
import { Message, UrlInput } from 'oskari-ui';
import { Controller } from 'oskari-ui/util';

const { CREDENTIALS } = Oskari.clazz.get('Oskari.mapframework.domain.LayerComposingModel');

export const ServiceUrlInput = ({ layer, propertyFields, disabled, controller, credentialsCollapseOpen = false }) => {
    const credentialProps = {
        allowCredentials: propertyFields.includes(CREDENTIALS),
        defaultOpen: credentialsCollapseOpen,
        usernameValue: layer.username,
        passwordValue: layer.password,
        panelText: <Message messageKey='usernameAndPassword'/>,
        usernameText: <Message messageKey='fields.username'/>,
        passwordText: <Message messageKey='fields.password'/>,
        usernameOnChange: controller.setUsername,
        passwordOnChange: controller.setPassword
    };
    return (
        <UrlInput
            key={`refreshOnLayerChange_${layer.id}`}
            value={layer.url}
            disabled={disabled}
            onChange={url => controller.setLayerUrl(url)}
            credentials={credentialProps}/>
    );
};
ServiceUrlInput.propTypes = {
    layer: PropTypes.object.isRequired,
    propertyFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool,
    controller: PropTypes.instanceOf(Controller).isRequired,
    credentialsCollapseOpen: PropTypes.bool
};
