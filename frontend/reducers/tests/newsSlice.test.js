import newsSlice, {resetNewsItemData, resetNotification} from '../newsSlice';
import {CREATE_NEWS_FULFILLED, CREATE_NEWS_REJECTED, LOAD_NEWS_ITEM_FULFILLED, LOAD_NEWS_ITEM_REJECTED} from '../../constants/actionTypes/news';
import NOTIFICATION_TYPES from '../../constants/notificationTypes';

describe('userAuthSlice tests', () => {
    const applyAction = (action, initialState) => newsSlice(initialState, action);

    afterAll(() => {
        applyAction(resetNotification());
    });

    describe('notification type', () => {
        it('CREATE_NEWS_REJECTED should set success notification type', () => {
            expect(
                applyAction({type: CREATE_NEWS_FULFILLED}).notificationType
            ).toBe(NOTIFICATION_TYPES.SUCCESS);
        });

        it('CREATE_NEWS_REJECTED should set fail notification type', () => {
            expect(
                applyAction({type: CREATE_NEWS_REJECTED}).notificationType
            ).toBe(NOTIFICATION_TYPES.FAIL);
        });

        it('resetNotification should reset notification type', () => {
            const stateWithNotification = applyAction({type: CREATE_NEWS_FULFILLED});
            expect(
                applyAction(resetNotification(), stateWithNotification).notificationType
            ).toBe(null);
        });

        it('resetNotification should reset notification type', () => {
            const stateWithNotification = applyAction({type: CREATE_NEWS_FULFILLED});
            expect(
                applyAction(resetNotification(), stateWithNotification).notificationType
            ).toBe(null);
        });
    });

    describe('newsItem', () => {
        const newsItemMockData = {content: 'content', title: 'title'};

        it('LOAD_NEWS_ITEM_FULFILLED should set found news data', () => {
            expect(
                applyAction({type: LOAD_NEWS_ITEM_FULFILLED, payload: newsItemMockData}).newsItem
            ).toBe(newsItemMockData);
        });

        it('LOAD_NEWS_ITEM_REJECTED should set requestingNewsNotFound equals true', () => {
            expect(
                applyAction({type: LOAD_NEWS_ITEM_REJECTED}).requestingNewsNotFound
            ).toBeTruthy();
        });

        it('resetNewsItemData should reset newsItem', () => {
            const stateWithNewsItemData = applyAction({type: LOAD_NEWS_ITEM_FULFILLED, payload: newsItemMockData});
            expect(
                applyAction(resetNewsItemData(), stateWithNewsItemData).newsItem
            ).toBe(null);
        });

        it('resetNewsItemData should reset requestingNewsNotFound', () => {
            const stateWithNewsItemData = applyAction({type: LOAD_NEWS_ITEM_FULFILLED, payload: newsItemMockData});
            expect(
                applyAction(resetNewsItemData(), stateWithNewsItemData).requestingNewsNotFound
            ).toBe(false);
        });
    });
});
