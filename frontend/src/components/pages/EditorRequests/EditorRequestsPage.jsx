import React from 'react';
import PageWrapper from '../../common/PageWrapper';
import PropTypes from 'prop-types';
import {Pagination} from 'react-rainbow-components';
import EditorRequestItem from './EditorRequestItem';
import './index.css';

const EditorRequestsPage = ({approvePermissions, denyPermissions, onChangePageCallback, requests, currentPage, lastPage}) => {

    function handlePageChange(event, page) {
        onChangePageCallback(page);
    }

    return (
        <PageWrapper className="content-center editor-requests">
            {requests.length ? (
                <>
                    <div className="editor-requests__container">
                        {requests.map((item) => (
                            <EditorRequestItem
                                requestData={item}
                                approvePermissions={approvePermissions}
                                denyPermissions={denyPermissions}
                                key={item.id}
                            />
                        ))}
                    </div>
                    <Pagination
                        className="rainbow-m_auto editor-requests__pagination"
                        pages={lastPage}
                        activePage={currentPage}
                        onChange={handlePageChange}
                    />
                </>
            ) : (
                 <h1 className="editor-requests__header rainbow-font-size-text_large">
                     No editor requests found yet...
                 </h1>
             )}
        </PageWrapper>
    );
};

EditorRequestsPage.propTypes = {
    approvePermissions:   PropTypes.func.isRequired,
    denyPermissions:      PropTypes.func.isRequired,
    onChangePageCallback: PropTypes.func.isRequired,
    requests:             PropTypes.array,
    currentPage:          PropTypes.number,
    lastPage:             PropTypes.number,
};

export default EditorRequestsPage;
