import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import EditorRequestsPage from './EditorRequestsPage';
import createErrorCatchingAction from '../../actions/createErrorCatchingAction';
import updateEditorPermissions from '../../actions/users/updateEditorPermissions';
import loadEditorRequests from '../../actions/editor-requests/loadEditorRequests';
import {useUserRedirect} from '../../helpers/routerHelper';
import {SIGN_UP} from '../../constants/routerPaths';
import {RECORDS_ON_PAGE} from '../../constants/pagination';
import {setError} from '../../reducers/appErrorSlice';

const EditorRequestsPageContainer = ({data, errorMessage}) => {
    const dispatch = useDispatch();

    useUserRedirect(false, SIGN_UP);

    const [currentPage, setCurrentPage] = useState(data.currentPage || 1);
    const [lastPage, setLastPage]       = useState(data.lastPage || 1);
    const [views, setViews]             = useState(data.views || []);

    useEffect(() => {
        if (errorMessage) {
            dispatch(setError(errorMessage));
        }
    }, [errorMessage]);

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

EditorRequestsPageContainer.propTypes = {
    data: PropTypes.object,
    errorMessage: PropTypes.string,
};

export default EditorRequestsPageContainer;
