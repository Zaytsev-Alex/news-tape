import React, {useEffect, useState} from 'react';
import EditorRequestsPage from './EditorRequestsPage';
import {useDispatch} from 'react-redux';
import createErrorCatchingAction from '../../../actions/createErrorCatchingAction';
import updateEditorPermissions from '../../../actions/users/updateEditorPermissions';
import loadEditorRequests from '../../../actions/editor-requests/loadEditorRequests';

const RECORDS_ON_PAGE = 10;

const EditorRequestsPageContainer = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage]       = useState(1);
    const [views, setViews]             = useState([]);

    useEffect(() => {
        loadRequests(currentPage);
    }, []);

    function approvePermissions(requestId) {
        return updatePermissions(requestId, true);
    }

    function denyPermissions(requestId) {
        return updatePermissions(requestId, false);
    }

    function updatePermissions(requestId, approve) {
        createErrorCatchingAction(dispatch, updateEditorPermissions, {requestId, approve})
            .then((response) => {
                if (response.payload) {
                    loadRequests(currentPage);
                }
            });
    }

    function onChangePage(page) {
        if (page !== currentPage) {
            loadRequests(page);
        }
    }

    function loadRequests(page) {
        createErrorCatchingAction(dispatch, loadEditorRequests, {take: RECORDS_ON_PAGE, page})
            .then((response) => {
                if (response?.payload) {
                    const _payload = response.payload;
                    setCurrentPage(_payload.currentPage);
                    setLastPage(_payload.lastPage);
                    setViews(_payload.views);
                }
            });
    }

    return (
        <EditorRequestsPage
            approvePermissions={approvePermissions}
            denyPermissions={denyPermissions}
            onChangePageCallback={onChangePage}
            recordsOnPage={RECORDS_ON_PAGE}
            lastPage={lastPage}
            currentPage={currentPage}
            requests={views}
        />
    );
};

export default EditorRequestsPageContainer;
