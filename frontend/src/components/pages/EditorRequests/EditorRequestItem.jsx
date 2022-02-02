import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-rainbow-components';
import {extractUserName} from '../../../helpers/utils';

const EditorRequestItem = ({requestData, approvePermissions, denyPermissions}) => {

    function onDenyClick() {
        denyPermissions(requestData.id);
    }

    function onApproveClick() {
        approvePermissions(requestData.id);
    }

    return (
        <Card
            className="rainbow-m-bottom_x-large rainbow-m-right_small editor-request-item"
            footer={
                <div className="editor-request-item__buttons-container">
                    <Button
                        label="Deny"
                        onClick={onDenyClick}
                        variant="destructive"
                        className="rainbow-m-around_medium editor-request-item__button"
                        shaded
                    />
                    <Button
                        label="Approve"
                        onClick={onApproveClick}
                        variant="brand"
                        className="rainbow-m-around_medium editor-request-item__button"
                        shaded
                    />
                </div>
            }
        >
            <div className="editor-request-item__name">
                {extractUserName(requestData.user)}
            </div>
            <div className="editor-request-item__email">
                {requestData.user.email}
            </div>
        </Card>
    );
};

EditorRequestItem.propTypes = {
    requestData:        PropTypes.object.isRequired,
    approvePermissions: PropTypes.func.isRequired,
    denyPermissions:    PropTypes.func.isRequired
};

export default EditorRequestItem;
