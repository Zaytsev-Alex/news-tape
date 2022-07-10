import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-rainbow-components';
import {extractUserName} from '../../helpers/utils';
import styles from './styles.module.css';

const EditorRequestItem = ({requestData, approvePermissions, denyPermissions}) => {

    function onDenyClick() {
        denyPermissions(requestData.id);
    }

    function onApproveClick() {
        approvePermissions(requestData.id);
    }

    return (
        <Card
            className={`rainbow-m-bottom_x-large rainbow-m-right_small ${styles.editorRequestItem}`}
            footer={
                <div className={styles.editorRequestItemButtons}>
                    <Button
                        label="Deny"
                        onClick={onDenyClick}
                        variant="destructive"
                        className="rainbow-m-around_medium editorRequestItemButton"
                        shaded
                    />
                    <Button
                        label="Approve"
                        onClick={onApproveClick}
                        variant="brand"
                        className="rainbow-m-around_medium editorRequestItemButton"
                        shaded
                    />
                </div>
            }
        >
            <div className={styles.editorRequestItemName}>
                {extractUserName(requestData.user)}
            </div>
            <div className={styles.editorRequestItemEmail}>
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
