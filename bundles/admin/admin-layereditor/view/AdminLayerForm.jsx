import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabPane } from '../components/Tabs';
import { Button } from '../components/Button';
import { GeneralTabPane } from './AdminLayerForm/GeneralTabPane';
import { VisualizationTabPane } from './AdminLayerForm/VisualizationTabPane';
import { AdditionalTabPane } from './AdminLayerForm/AdditionalTabPane';
import { PermissionsTabPane } from './AdminLayerForm/PermissionsTabPane';
import { StyledRoot } from './AdminLayerForm/AdminLayerFormStyledComponents';
import { Alert } from '../components/Alert';
import { withContext } from '../../../../src/react/util';
import { Confirm } from '../components/Confirm';
import styled from 'styled-components';

const PaddedButton = styled(Button)`
    margin-right: 5px;
`;
const AdminLayerForm = ({
    mutator,
    mapLayerGroups,
    dataProviders,
    layer,
    message = {},
    onCancel,
    onDelete,
    onSave,
    loc
}) => {
    if (message.key) {
        message.text = loc(message.key);
    }
    return (
        <StyledRoot>
            { message.text &&
                <Alert message={message.text} type={message.type} />
            }
            <Tabs>
                <TabPane tab={loc('generalTabTitle')} key='general'>
                    <GeneralTabPane
                        dataProviders={dataProviders}
                        mapLayerGroups={mapLayerGroups}
                        layer={layer}
                        service={mutator} />
                </TabPane>
                <TabPane tab={loc('visualizationTabTitle')} key='visual'>
                    <VisualizationTabPane layer={layer} service={mutator} />
                </TabPane>
                <TabPane tab={loc('additionalTabTitle')} key='additional'>
                    <AdditionalTabPane layer={layer} service={mutator} />
                </TabPane>
                <TabPane tab={loc('permissionsTabTitle')} key='permissions'>
                    <PermissionsTabPane />
                </TabPane>
            </Tabs>
            <PaddedButton type='primary' onClick={() => onSave()}>
                { layer.isNew &&
                    loc('add')
                }
                { !layer.isNew &&
                    loc('save')
                }
            </PaddedButton>
            { !layer.isNew &&
                <Confirm title={loc('messages.confirmDeleteLayer')} onConfirm={() => onDelete()}
                    okText={loc('ok')} cancelText={loc('cancel')} placement='bottomLeft'>
                    <PaddedButton>{loc('delete')}</PaddedButton>
                </Confirm>
            }
            { onCancel &&
                <Button onClick={() => onCancel()}>{loc('cancel')}</Button>
            }
        </StyledRoot>
    );
};

AdminLayerForm.propTypes = {
    mutator: PropTypes.object.isRequired,
    mapLayerGroups: PropTypes.array.isRequired,
    dataProviders: PropTypes.array.isRequired,
    layer: PropTypes.object.isRequired,
    message: PropTypes.object,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    loc: PropTypes.func.isRequired
};

const contextWrap = withContext(AdminLayerForm);
export { contextWrap as AdminLayerForm };
