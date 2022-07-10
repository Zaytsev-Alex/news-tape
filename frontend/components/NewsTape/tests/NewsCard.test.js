import {act, fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import NewsCard from '../NewsCard';

describe('NewsCard tests', () => {
    let container    = null;
    let showNextMock = jest.fn();
    let showPrevMock = jest.fn();
    const newsData   = {
        content: 'content', title: 'title'
    }

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should be defined', () => {
            expect(container.querySelector('.news-card')).toBeInTheDocument();
        });

        it('should render news content, when infoCard parameter is false', () => {
            expect(container.querySelector('.markdown-viewer')).toBeInTheDocument();
        });

        it('should render empty values, when infoCard parameter is true and no yet data has passed', () => {
            renderComponent(false, false, null);
            expect(container.querySelector('.markdown-viewer').textContent).toBe('');
        });

        it('should not render news content, when infoCard parameter is true', () => {
            renderComponent(true);
            expect(container.querySelector('.markdown-viewer')).not.toBeInTheDocument();
        });

        it('should render link to create news page, when infoCard parameter is true and user is an admin', () => {
            renderComponent(true, true);
            expect(screen.getByText('Create news')).toBeInTheDocument();
        });

        it('should not render link to create news page, when infoCard parameter is true and user is not an admin', () => {
            renderComponent(true, false);
            expect(container.querySelector('.news-card__link')).not.toBeInTheDocument();
        });
    });

    describe('behavior', () => {
        it('should call showPrev method, when user presses corresponding button', () => {
            prevButtonPress(container);
            expect(showPrevMock).toBeCalledTimes(1);
        });

        it('should call showNext method, when user presses corresponding button', () => {
            nextButtonPress(container);
            expect(showNextMock).toBeCalledTimes(1);
        });
    });

    function renderComponent(infoCard, isAdmin, _newsData = newsData) {
        const renderRes = render(
            <BrowserRouter>
                <NewsCard
                    newsData={_newsData}
                    showNext={showNextMock}
                    showPrev={showPrevMock}
                    isAdmin={isAdmin}
                    infoCard={infoCard}
                    hasNext
                    hasPrev
                />
            </BrowserRouter>
        );
        container       = renderRes.container;
    }
});

export function prevButtonPress(container) {
    act(() => {
        fireEvent(
            container.querySelector('.news-card__buttons-container button:first-child'),
            new MouseEvent('click', {
                bubbles:    true,
                cancelable: true,
            })
        );
    });
}

export function nextButtonPress(container) {
    act(() => {
        fireEvent(
            container.querySelector('.news-card__buttons-container button:last-child'),
            new MouseEvent('click', {
                bubbles:    true,
                cancelable: true,
            })
        );
    });
}
