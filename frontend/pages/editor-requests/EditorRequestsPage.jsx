import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import PropTypes from 'prop-types';
import {Pagination} from 'react-rainbow-components';
import EditorRequestItem from './EditorRequestItem';
import styles from './styles.module.css';

const EditorRequestsPage = ({approvePermissions, denyPermissions, onChangePageCallback, requests, currentPage, lastPage}) => {

    function handlePageChange(event, page) {
        onChangePageCallback(page);
    }

    return (
        <PageWrapper className={`content-center ${styles.editorRequests}`}>
            {requests.length ? (
                <>
                    <div className={styles.editorRequestsContainer}>
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
