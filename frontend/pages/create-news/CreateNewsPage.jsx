import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Chip, Input, Textarea} from 'react-rainbow-components';
import {FIELD_NAMES} from './constants';
import styles from './styles.module.css';
import NOTIFICATION_TYPES from '../../constants/notificationTypes';
import PageWrapper from '../../components/PageWrapper';
import MarkdownViewer from '../../components/MarkdownViewer';

const CreateNewsPage = ({createNews, resetNotification, notificationType}) => {
    const [newsData, setNewsData] = useState({});

    const changeValueHandlers = {
        [FIELD_NAMES.TITLE]:   (event) => changeValue(FIELD_NAMES.TITLE, event.target.value),
        [FIELD_NAMES.CONTENT]: (event) => changeValue(FIELD_NAMES.CONTENT, event.target.value)
    }

    function changeValue(name, value) {
        if (notificationType) {
            resetNotification();
        }
        setNewsData({...newsData, [name]: value});
    }

    function validateForm() {
        return !!(
            (newsData[FIELD_NAMES.CONTENT] || '').trim() && (newsData[FIELD_NAMES.TITLE] || '').trim()
        );
    }

    function onSubmit() {
        createNews(newsData);
    }

    function renderNotification() {
        if (notificationType === NOTIFICATION_TYPES.SUCCESS) {
            return (
                <Chip
                    className={`rainbow-m-around_medium ${styles.createNewsNotification}`}
                    label="Created"
                    variant="success"
                />
            );
        }

        if (notificationType === NOTIFICATION_TYPES.FAIL) {
            return (
                <Chip
                    className={`rainbow-m-around_medium ${styles.createNewsNotification}`}
                    label="Whoops. Error occurred."
                    variant="error"
                />
            );
        }
    }

    return (
        <PageWrapper className="content-center">
            <form className={styles.createNewsForm}>
                <fieldset className={styles.createNewsFieldset}>
                    {renderNotification()}
                    <legend className={styles.createNewsLegend}>
                        <h1 className={styles.createNewsHeader}>Create news</h1>
                    </legend>
                    <Input
                        label="Title"
                        type="text"
                        className={`rainbow-p-around_medium ${styles.createNewsTitleInput}`}
                        onChange={changeValueHandlers[FIELD_NAMES.TITLE]}
                        value={newsData[FIELD_NAMES.TITLE] || ''}
                        labelAlignment="left"
                        maxLength={255}
                        required
                    />
                    <div className={styles.createNewsContentGroup}>
                        <Textarea
                            label="Content (in markdown)"
                            className={`rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto ${styles.markdownEditor}`}
                            onChange={changeValueHandlers[FIELD_NAMES.CONTENT]}
                            value={newsData[FIELD_NAMES.CONTENT]}
                            required
                        />
                        <div className={styles.createNewsMarkdownViewer}>
                            <span className={styles.createNewsLabel}>Preview:</span>
                            <MarkdownViewer className={styles.markdownViewer}>
                                {newsData[FIELD_NAMES.CONTENT] || ''}
                            </MarkdownViewer>
                        </div>
                    </div>
                    <Button
                        label="Create"
                        onClick={onSubmit}
                        variant="brand"
                        className="rainbow-m-around_medium submit-button"
                        disabled={!validateForm()}
                        shaded
                    />
                </fieldset>
            </form>
        </PageWrapper>
    );
};

CreateNewsPage.propTypes = {
    createNews:        PropTypes.func.isRequired,
    resetNotification: PropTypes.func.isRequired,
    notificationType:  PropTypes.string
};

export default CreateNewsPage;
