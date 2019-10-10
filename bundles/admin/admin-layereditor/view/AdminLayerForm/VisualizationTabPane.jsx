import React from 'react';
import PropTypes from 'prop-types';
import { StyleSelect } from './StyleSelect';
import { Slider } from '../../components/Slider';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Opacity } from '../../components/Opacity';
import { StyledTab, StyledComponent, StyledColumnLeft, StyledColumnRight } from './AdminLayerFormStyledComponents';
import { withContext } from '../../../../../src/react/util.jsx';
import styled from 'styled-components';

const VerticalComponent = styled(StyledComponent)`
    height: 400px;
    padding-bottom: 20px;
    margin-left: 25%;
`;

const VisualizationTabPane = (props) => {
    const { layer, service, loc } = props;
    return (
        <StyledTab>
            <StyledColumnLeft>
                <label>{loc('opacity')}</label>
                <StyledComponent>
                    <Opacity key={layer.layer_id} defaultValue={layer.opacity} onChange={(value) => service.setOpacity(value)} />
                </StyledComponent>
                <label>{loc('style')}</label>
                <StyledComponent>
                    <StyleSelect styles={layer.styles} currentStyle={layer.style} service={service} />
                </StyledComponent>
                <label>{loc('styleJSON')}</label>
                <StyledComponent>
                    <TextAreaInput rows={6} value={layer.styleJSON} onChange={(evt) => service.setStyleJSON(evt.target.value)} />
                </StyledComponent>
                <label>{loc('hoverJSON')}</label>
                <StyledComponent>
                    <TextAreaInput rows={6} value={layer.hoverJSON} onChange={(evt) => service.setHoverJSON(evt.target.value)}/>
                </StyledComponent>
            </StyledColumnLeft>
            <StyledColumnRight>
                <label>{loc('minAndMaxScale')}</label>
                <VerticalComponent>
                    <Slider key={layer.layer_id}
                        vertical
                        range
                        defaultValue={[layer.minScale, layer.maxScale]}
                        min={0}
                        max={100000000}
                        onChange={(values) => service.setMinAndMaxScale(values)} />
                </VerticalComponent>
            </StyledColumnRight>
        </StyledTab>
    );
};

VisualizationTabPane.propTypes = {
    layer: PropTypes.object,
    service: PropTypes.any,
    visualizationProps: PropTypes.any,
    loc: PropTypes.func
};

const contextWrap = withContext(VisualizationTabPane);
export { contextWrap as VisualizationTabPane };
