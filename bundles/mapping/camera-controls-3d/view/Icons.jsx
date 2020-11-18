import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'oskari-ui';

const iconSize = '24px';
const mobileIconSize = '32px';
const svgFill = '#ffffff';
const iconStyle = { outline: 'none' };
// TODO: Change secondary color reference later when global way available
const secondaryColor = '#006ce8';

const UpSvg = ({ isMobile }) => (
    <svg width={isMobile ? mobileIconSize : iconSize} height={isMobile ? mobileIconSize : iconSize} viewBox="0 0 24 24">
        <g id="3D-upward" stroke="none" strokeWidth="1" fillRule="nonzero">
            <path d="M12,3.93933983 L15.5303301,7.46966991 C15.8232233,7.76256313 15.8232233,8.23743687 15.5303301,8.53033009 C15.2640635,8.79659665 14.8473998,8.8208027 14.5537883,8.60294824 L14.4696699,8.53033009 L12.75,6.81033983 L12.75,13.25 L11.25,13.25 L11.25,6.81033983 L9.53033009,8.53033009 C9.26406352,8.79659665 8.84739984,8.8208027 8.55378835,8.60294824 L8.46966991,8.53033009 C8.20340335,8.26406352 8.1791973,7.84739984 8.39705176,7.55378835 L8.46966991,7.46966991 L12,3.93933983 Z" id="Combined-Shape" fill={svgFill} fillRule="nonzero"></path>
            <path d="M5.62209673,18.1021658 C9.74978057,15.6943503 13.9299778,15.6341549 18.0602873,17.9215797 L18.3779033,18.1021658 L19.0257374,18.4800691 L18.2699309,19.7757374 L17.6220967,19.3978342 C13.960243,17.2617528 10.3506039,17.2024172 6.69165094,19.2198274 L6.37790327,19.3978342 L5.73006909,19.7757374 L4.97426256,18.4800691 L5.62209673,18.1021658 Z" id="Path-2" fill={svgFill} fillRule="nonzero"></path>
        </g>
    </svg>
);
UpSvg.propTypes = {
    isMobile: PropTypes.bool.isRequired
};

const DownSvg = ({ isMobile }) => (
    <svg width={isMobile ? mobileIconSize : iconSize} height={isMobile ? mobileIconSize : iconSize} viewBox="0 0 24 24">
        <g id="3D-downward" stroke="none" strokeWidth="1" fillRule="nonzero">
            <path d="M15,9 L12,12 L9,9 M12,10.5 L12,4.5" id="Combined-Shape" stroke={svgFill} strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M5.62209673,18.1021658 C9.74978057,15.6943503 13.9299778,15.6341549 18.0602873,17.9215797 L18.3779033,18.1021658 L19.0257374,18.4800691 L18.2699309,19.7757374 L17.6220967,19.3978342 C13.960243,17.2617528 10.3506039,17.2024172 6.69165094,19.2198274 L6.37790327,19.3978342 L5.73006909,19.7757374 L4.97426256,18.4800691 L5.62209673,18.1021658 Z" id="Path-2" fill={svgFill} fillRule="nonzero"></path>
        </g>
    </svg>
);
DownSvg.propTypes = {
    isMobile: PropTypes.bool.isRequired
};

const MoveMapSvg = ({ isMobile, controlIsActive }) => (
    <svg width={isMobile ? mobileIconSize : iconSize} height={isMobile ? mobileIconSize : iconSize} viewBox="0 0 24 24">
        <g id="move" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path d="M12.1803973,3.0525387 C12.1955584,3.06390955 12.2090265,3.07737757 12.2203973,3.0925387 L14.3120066,5.88135105 C14.3782807,5.96971661 14.3603721,6.09507688 14.2720066,6.16135105 C14.2373873,6.18731548 14.1952806,6.20135105 14.1520066,6.20135105 L12.89,6.201 L12.89,11.109 L17.798,11.109 L17.798649,9.84799342 C17.798649,9.73753647 17.888192,9.64799342 17.998649,9.64799342 C18.041923,9.64799342 18.0840297,9.662029 18.118649,9.68799342 L20.9074613,11.7796027 C20.9958269,11.8458769 21.0137355,11.9712371 20.9474613,12.0596027 C20.9360904,12.0747638 20.9226224,12.0882318 20.9074613,12.0996027 L18.118649,14.1912119 C18.0302834,14.2574861 17.9049231,14.2395775 17.838649,14.1512119 C17.8126845,14.1165927 17.798649,14.074486 17.798649,14.0312119 L17.798,12.77 L12.89,12.77 L12.89,17.677 L14.1520066,17.6778543 C14.2624635,17.6778543 14.3520066,17.7673974 14.3520066,17.8778543 C14.3520066,17.9211284 14.337971,17.9632351 14.3120066,17.9978543 L12.2203973,20.7866667 C12.1541231,20.8750322 12.0287629,20.8929408 11.9403973,20.8266667 C11.9252362,20.8152958 11.9117682,20.8018278 11.9003973,20.7866667 L9.80878805,17.9978543 C9.74251388,17.9094888 9.76042249,17.7841285 9.84878805,17.7178543 C9.88340729,17.6918899 9.92551401,17.6778543 9.96878805,17.6778543 L11.229,17.677 L11.229,12.77 L6.322,12.77 L6.32214568,14.0312119 C6.32214568,14.1416689 6.23260263,14.2312119 6.12214568,14.2312119 C6.07887164,14.2312119 6.03676492,14.2171764 6.00214568,14.1912119 L3.21333333,12.0996027 C3.12496777,12.0333285 3.10705916,11.9079682 3.17333333,11.8196027 C3.18470418,11.8044416 3.1981722,11.7909735 3.21333333,11.7796027 L6.00214568,9.68799342 C6.09051124,9.62171925 6.21587151,9.63962786 6.28214568,9.72799342 C6.30811011,9.76261266 6.32214568,9.80471938 6.32214568,9.84799342 L6.322,11.109 L11.229,11.109 L11.229,6.201 L9.96878805,6.20135105 C9.8583311,6.20135105 9.76878805,6.111808 9.76878805,6.00135105 C9.76878805,5.95807701 9.78282363,5.91597028 9.80878805,5.88135105 L11.9003973,3.0925387 C11.9666715,3.00417314 12.0920318,2.98626453 12.1803973,3.0525387 Z" id="Combined-Shape-Copy" fill={controlIsActive && isMobile ? secondaryColor : svgFill}></path>
        </g>
    </svg>
);
MoveMapSvg.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    controlIsActive: PropTypes.bool.isRequired
};

const RotateMapSvg = ({ isMobile, controlIsActive }) => (
    <svg width={isMobile ? mobileIconSize : iconSize} height={isMobile ? mobileIconSize : iconSize} viewBox="0 0 24 24">
        <g id="rotate" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path d="M15.9731748,4.0020101 L19.7679812,4.5441253 C19.877328,4.55974627 19.9533078,4.66105267 19.9376869,4.77039947 C19.931567,4.81323859 19.9117177,4.85293719 19.8811183,4.88353656 L18.963234,5.80201604 C21.8658174,9.33732546 21.6660597,14.5669718 18.363961,17.8690705 C14.8492424,21.3837891 9.15075759,21.3837891 5.63603897,17.8690705 C2.12132034,14.3543518 2.12132034,8.65586703 5.63603897,5.1411484 L5.63603897,5.1411484 L6.90883118,6.41394061 C4.09705628,9.22571551 4.09705628,13.7845034 6.90883118,16.5962783 C9.72060608,19.4080532 14.2793939,19.4080532 17.0911688,16.5962783 C19.6895228,13.9979243 19.8867445,9.90769801 17.682834,7.08287017 L16.6284271,8.13622775 C16.5503223,8.21433261 16.4236893,8.21433261 16.3455844,8.13622775 C16.314985,8.10562838 16.2951357,8.06592978 16.2890159,8.02309066 L15.7469007,4.22828427 C15.7312797,4.11893747 15.8072595,4.01763107 15.9166063,4.0020101 C15.9353672,3.99932997 15.9544139,3.99932997 15.9731748,4.0020101 Z" id="Combined-Shape" fill={controlIsActive && isMobile ? secondaryColor : svgFill}></path>
        </g>
    </svg>
);
RotateMapSvg.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    controlIsActive: PropTypes.bool.isRequired
};

export const UpIcon = ({ mapInMobileMode, clickHandler, title }) =>
    <Icon style={iconStyle} component={() =>
        <UpSvg isMobile={mapInMobileMode}/>} onClick={clickHandler} title = {title}/>;
UpIcon.propTypes = {
    mapInMobileMode: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired,
    title: PropTypes.string
};

export const DownIcon = ({ mapInMobileMode, clickHandler, title }) =>
    <Icon style={iconStyle} component={() =>
        <DownSvg isMobile={mapInMobileMode}/>} onClick={clickHandler} title = {title}/>;
DownIcon.propTypes = {
    mapInMobileMode: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired,
    title: PropTypes.string
};

export const MoveMapIcon = ({ mapInMobileMode, clickHandler, title, controlIsActive }) =>
    <Icon style={iconStyle} component={() =>
        <MoveMapSvg isMobile={mapInMobileMode} controlIsActive={controlIsActive}/>} onClick={clickHandler} title = {title}/>;
MoveMapIcon.propTypes = {
    mapInMobileMode: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired,
    title: PropTypes.string,
    controlIsActive: PropTypes.bool.isRequired
};

export const RotateMapIcon = ({ mapInMobileMode, clickHandler, title, controlIsActive }) =>
    <Icon style={iconStyle} component={() =>
        <RotateMapSvg isMobile={mapInMobileMode} controlIsActive={controlIsActive}/>} onClick={clickHandler} title = {title}/>;
RotateMapIcon.propTypes = {
    mapInMobileMode: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired,
    title: PropTypes.string,
    controlIsActive: PropTypes.bool.isRequired
};
