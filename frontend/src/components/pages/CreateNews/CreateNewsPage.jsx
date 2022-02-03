import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PageWrapper from '../../common/PageWrapper';
import {Button, Chip, Input, Textarea} from 'react-rainbow-components';
import {FIELD_NAMES} from './constants';
import MarkdownViewer from '../../common/MarkdownViewer';
import NOTIFICATION_TYPES from '../../../constants/notificationTypes';
import './index.css';

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
                    className="rainbow-m-around_medium create-news__notification"
                    label="Created"
                    variant="success"
                />
            );
        }

        if (notificationType === NOTIFICATION_TYPES.FAIL) {
            return (
                <Chip
                    className="rainbow-m-around_medium create-news__notification"
                    label="Whoops. Error occurred."
                    variant="error"
                />
            );
        }
    }

    return (
        <PageWrapper className="content-center create-news">
            <form className="create-news__form">
                <fieldset className="create-news__fieldset">
                    {renderNotification()}
                    <legend className="create-news__legend">
                        <h1 className="create-news__header">Create news</h1>
                    </legend>
                    <Input
                        label="Title"
                        type="text"
                        className="rainbow-p-around_medium create-news__title-input"
                        onChange={changeValueHandlers[FIELD_NAMES.TITLE]}
                        value={newsData[FIELD_NAMES.TITLE] || ''}
                        labelAlignment="left"
                        maxLength={255}
                        required
                    />
                    <div className="create-news__content-group">
                        <Textarea
                            label="Content (in markdown)"
                            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto markdown-editor"
                            onChange={changeValueHandlers[FIELD_NAMES.CONTENT]}
                            value={newsData[FIELD_NAMES.CONTENT]}
                            required
                        />
                        <div className="create-news__markdown-viewer">
                            <span className="create-news__label">Preview:</span>
                            <MarkdownViewer>
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
