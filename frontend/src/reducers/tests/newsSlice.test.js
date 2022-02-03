import newsSlice, {resetNotification} from '../newsSlice';
import {CREATE_NEWS_FULFILLED, CREATE_NEWS_REJECTED} from '../../constants/actionTypes/news';
import NOTIFICATION_TYPES from '../../constants/notificationTypes';

describe('userAuthSlice tests', () => {
    const applyAction = (action, initialState) => newsSlice(initialState, action);

    afterAll(() => {
        applyAction(resetNotification());
    });

    test('CREATE_NEWS_REJECTED should set success notification type', () => {
        expect(
            applyAction({type: CREATE_NEWS_FULFILLED}).notificationType
        ).toBe(NOTIFICATION_TYPES.SUCCESS)
    });

    test('CREATE_NEWS_REJECTED should set fail notification type', () => {
        expect(
            applyAction({type: CREATE_NEWS_REJECTED}).notificationType
        ).toBe(NOTIFICATION_TYPES.FAIL)
    });

    test('resetNotification should reset notification type', () => {
        const stateWithNotification = applyAction({type: CREATE_NEWS_FULFILLED});
        expect(
            applyAction(resetNotification(), stateWithNotification).notificationType
        ).toBe(null)
    });
});
