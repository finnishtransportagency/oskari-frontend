import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from 'oskari-ui/util';
import styled from 'styled-components';

const Label = styled('div')`
    display: inline-block;
`;

/**
 * @class Message
 * @calssdesc <Message>
 * @memberof module:oskari-ui
 * @see {@link module:oskari-ui/util.LocaleProvider|LocaleProvider}
 * @param {Object} props - { bundleKey, messageKey, messageArgs:optional, getMessage:optional, LabelComponent:optional }
 *
 * @example <caption>Registering bundle localization</caption>
 * Oskari.registerLocalization({
 *     "lang": "en",
 *     "key": "helloworld",
 *     "value": {
 *         "hello": "Hello {name}!"
 *     }
 * });
 *
 * @example <caption>Basic usage</caption>
 * <Message bundleKey="helloworld" messageKey="hello" messageArgs={['Jack']}/>
 *
 * @example <caption>With LocaleProvider</caption>
 * <LocaleProvider value={{bundleKey: 'helloworld'}}>
 *     <Message messageKey="hello" messageArgs={['Jack']}/>
 * </LocaleProvider>
 */
const Message = ({ bundleKey, messageKey, messageArgs, defaultMsg, getMessage, children, LabelComponent = Label }) => {
    if (!messageKey) {
        return null;
    }
    let message = messageKey;
    if (typeof getMessage === 'function') {
        message = getMessage(messageKey, messageArgs);
    } else {
        message = Oskari.getMsg(bundleKey, messageKey, messageArgs);
    }
    // If we didn't find localization AND we have default value -> use it
    if (message === messageKey && defaultMsg) {
        message = defaultMsg;
    }
    return (
        <LabelComponent onClick={() => Oskari.log().debug(`Text clicked - ${bundleKey}: ${messageKey}`)}>
            { message }
            { children }
        </LabelComponent>
    );
};
Message.propTypes = {
    bundleKey: PropTypes.string.isRequired,
    messageKey: PropTypes.string,
    defaultMsg: PropTypes.string,
    messageArgs: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    getMessage: PropTypes.func,
    children: PropTypes.node,
    LabelComponent: PropTypes.elementType
};

const wrapped = LocaleConsumer(Message);
export { wrapped as Message };
