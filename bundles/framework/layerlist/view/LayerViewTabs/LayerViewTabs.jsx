import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tabs, TabPane } from 'oskari-ui';
import { LayerList } from './LayerList/';
import { SelectedLayers, SelectedTab } from './SelectedLayers/';

const StyledTabs = styled(Tabs)`
    max-width: 600px;
`;

export const LayerViewTabs = ({ layerList, locale }) => {
    const layerKey = 0;
    const selectedKey = 1;
    const layers = Oskari.getSandbox().findAllSelectedMapLayers();
    const numLayers = layers.length;
    const { text, selected } = locale.filter;
    return (
        <StyledTabs tabPosition='top'>
            <TabPane tab={text} key={layerKey}>
                <LayerList {...layerList.state} mutator={layerList.mutator} locale={locale} />
            </TabPane>
            <TabPane tab={<SelectedTab num={numLayers} text={selected} />} key={selectedKey}>
                <SelectedLayers layers={layers} />
            </TabPane>
        </StyledTabs>
    );
};

const stateful = {
    state: PropTypes.object.isRequired,
    mutator: PropTypes.object.isRequired
};
LayerViewTabs.propTypes = {
    layerList: PropTypes.shape(stateful).isRequired,
    locale: PropTypes.shape({ filter: PropTypes.object }).isRequired
};