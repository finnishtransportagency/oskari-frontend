import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Select, Option, Message, Tag } from 'oskari-ui';
import { Controller } from 'oskari-ui/util';
import { StyledFormField } from '../styled';
import { InfoTooltip } from '../InfoTooltip';
import styled from 'styled-components';

const LayerComposingModel = Oskari.clazz.get('Oskari.mapframework.domain.LayerComposingModel');

const FlexRow = styled('div')`
    display: flex;
    > * {
        flex-grow: 1;
    }
    > :not(:last-child) {
        margin-right: 10px;
    }
`;

const EpsgCodeTags = ({ codes }) => {
    if (!codes || !Array.isArray(codes) || codes.length === 0) {
        return null;
    }
    return (
        <StyledFormField>
            { codes.map((epsg, i) => <Tag key={i}>{epsg}</Tag>) }
        </StyledFormField>
    );
};
EpsgCodeTags.propTypes = {
    codes: PropTypes.arrayOf(PropTypes.string)
};

const SupportedSRS = ({ epsgCodes }) => (
    <div>
        <Message messageKey='supportedSRS' />
        <EpsgCodeTags codes={epsgCodes} />
    </div>
);
SupportedSRS.propTypes = {
    epsgCodes: PropTypes.arrayOf(PropTypes.string)
};

const MissingSRS = ({ epsgCodes }) => {
    if (!epsgCodes || !Array.isArray(epsgCodes) || epsgCodes.length === 0) {
        return null;
    }
    return (
        <div>
            <Message messageKey='missingSRS' />
            <InfoTooltip messageKeys='missingSRSInfo' />
            <EpsgCodeTags codes={epsgCodes} />
        </div>
    );
};
MissingSRS.propTypes = {
    epsgCodes: PropTypes.arrayOf(PropTypes.string)
};

export const Srs = ({ layer, propertyFields, controller }) => {
    const systemProjections = Array.from(new Set(Oskari.app.getSystemDefaultViews().map(view => view.srsName)));
    const forced = (layer.attributes && layer.attributes.forcedSRS) || [];
    let supported = [];
    let missing = [];
    if (propertyFields.includes(LayerComposingModel.CAPABILITIES)) {
        if (layer.capabilities && Array.isArray(layer.capabilities.srs)) {
            supported = layer.capabilities.srs;
        }
        missing = systemProjections.filter(cur => !supported.includes(cur));
    }
    return (
        <Fragment>
            { propertyFields.includes(LayerComposingModel.CAPABILITIES) &&
                <FlexRow>
                    <SupportedSRS epsgCodes={supported}/>
                    <MissingSRS epsgCodes={missing}/>
                </FlexRow>
            }
            <Message messageKey='forcedSRS' />
            <InfoTooltip messageKeys='forcedSRSInfo' />
            <StyledFormField>
                <Select mode='tags' value={forced} onChange={forcedSRS => controller.setForcedSRS(forcedSRS)}>
                    { systemProjections.map(cur => <Option key={cur}>{cur}</Option>) }
                </Select>
            </StyledFormField>
        </Fragment>
    );
};

Srs.propTypes = {
    layer: PropTypes.object.isRequired,
    propertyFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    controller: PropTypes.instanceOf(Controller).isRequired
};
