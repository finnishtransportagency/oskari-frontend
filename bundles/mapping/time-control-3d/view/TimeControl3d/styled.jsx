import styled from 'styled-components';
import { Button, Slider, Select } from 'oskari-ui';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const primaryColor = '#ffd400';
const thickSlider = 8; // default is 4

export const CalendarIcon = styled(CalendarOutlined)`
    margin-right: 15px;
    color: #d9d9d9;
    font-size: 18px;
`;

export const ClockIcon = styled(ClockCircleOutlined)`
    margin-right: 15px;
    color: #d9d9d9;
    font-size: 18px;
`;

export const Row = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const Col = styled.div`
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    position: relative;
`;

export const StyledInput = styled.input`
    border-radius: 2px;
    box-shadow: inset 0.5px 0.5px 1.5px 0 rgba(0, 0, 0, 0.5);
    width: 70px;
    border: none;
    height: 38px;
    font-size: 16px;
    text-align: center;
`;

export const StyledButton = styled(Button)`
    background: ${primaryColor};
    color: #3c3c3c;
    width: 100%;
    height: 40px;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    &:focus,
    &:active,
    &:hover {
        background: #ecb900;
        color: #3c3c3c;
        border: 0;
    }
`;

const StyledSlider = styled(Slider)`
    &&& {
        height: ${props => props.useThick ? 12 + thickSlider : 16}px;
    }
    .ant-slider-mark {
        top: -21px;
    }
    .ant-slider-mark-text {
        color: #ffffff;
    }
    .ant-slider-dot {
        background: #3c3c3c;
        border-radius: 0%;
        border: 0;
        margin-left: 0px;
        width: 2px;
        top: 0px;
        height: ${props => props.useThick ? thickSlider : 4}px;
    }
    .ant-slider-dot:last-child {
        margin-left: 0px;
    }
    .ant-slider-rail {
        ${props => props.useThick ? 'height: ' + thickSlider + 'px;' : ''}
        background: #ffffff;
    }
    .ant-slider-track {
        ${props => props.useThick ? 'height: ' + thickSlider + 'px;' : ''}
        background: ${primaryColor};
    }
    .ant-slider-handle {
        width: 8px;
        height: ${props => props.useThick ? 12 + thickSlider : 16}px;
        border-radius: 6px;
        border: solid 1px #3c3c3c;
        background-color: ${primaryColor};
        &:focus,
        &:active,
        &:hover {
            border: solid 1px #3c3c3c !important;
            background-color: ${primaryColor} !important;
        }
        &:focus .ant-slider-track,
        &:active .ant-slider-track,
        &:hover .ant-slider-track {
            background: #ecb900 !important;
        }
    }
    &:hover .ant-slider-track {
        background: #ecb900 !important;
    }
    &:hover .ant-slider-handle {
        border: solid 1px #3c3c3c !important;
        background-color: ${primaryColor} !important;
    }
`;

export const StyledTimeSlider = styled(StyledSlider)`
    &&& {
        margin: 0px;
    }
`;

export const StyledDateSlider = styled(StyledSlider)`
    width: 93%;
    margin-top: 20px;
`;

export const StyledSelect = styled(Select)`
    &&&{
        color: #000000;
        text-align: center;
    }
    width: 100%;
    .ant-select-selection {
        background-color: #595959;
    }
    .ant-select-selection-item {
        padding-right: 0 !important;
    }
    .ant-select-arrow {
        color: #ffffff;
    }
`;

export const ColFixed = styled.div`
    flex: 0 0 65%;
    width: auto;
    max-width: 100%;
    position: relative;
`;
export const TimeBorder = styled.div(({ isMobile }) => ({
    borderRadius: '4px',
    border: '1px solid #949494',
    width: isMobile ? '72%' : '80%',
    padding: isMobile ? '12px 15px 8px 15px' : '20px 15px 4px 15px'
}));

export const StyledPlayButton = styled(Button)`
    padding: 0;
    border: 0;
    background: ${primaryColor};
    height: 42px;
    width: 40px;
    fill: #3c3c3c;
    &:focus,
    &:active,
    &:hover {
        background: #ecb900;
        fill: #3c3c3c;
        border: 0;
    }
`;
