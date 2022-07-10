import requireAuth from '../routerHelper';
import {render} from '@testing-library/react'
import {act} from "react-dom/test-utils";
import {Router, Route, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history'

describe('router helper tests', () => {
    const testString          = 'Request Component';
    const RequestingComponent = () => <h1>{testString}</h1>;
    const requestingUrl       = '/';
    const redirectingUrl      = '/test';
    const loggedInUser        = {};
    const loggedOutUser       = null;
    let container             = null;
    let history               = null;

    beforeEach(() => {
        history   = createMemoryHistory();
        container = null;
    });

    it('requireAuth should return requesting component if user is authorized and have to be authorized', () => {
        const Component = requireAuth(loggedInUser, RequestingComponent);
        act(() => {
            const renderRes = render(makeRouterContainer(Component, history, redirectingUrl, requestingUrl));
            container       = renderRes.container;
        });
        expect(history.location.pathname).toEqual(requestingUrl);
    });

    it('requireAuth should return redirect component if user is authorized, but have to be unauthorized', () => {
        const Component = requireAuth(loggedInUser, RequestingComponent, true, redirectingUrl);
        act(() => {
            const renderRes = render(makeRouterContainer(Component, history, redirectingUrl, requestingUrl));
            container       = renderRes.container;
        });
        expect(history.location.pathname).toEqual(redirectingUrl);
    });

    it('requireAuth should return redirect component if user is unauthorized, but have to be authorized', () => {
        const Component = requireAuth(loggedOutUser, RequestingComponent, false, redirectingUrl);
        act(() => {
            const renderRes = render(makeRouterContainer(Component, history, redirectingUrl, requestingUrl));
            container       = renderRes.container;
        });
        expect(history.location.pathname).toEqual(redirectingUrl);
    });

    it('requireAuth should return requesting component if user is unauthorized and have to be unauthorized', () => {
        const Component = requireAuth(loggedOutUser, RequestingComponent, true, redirectingUrl);
        act(() => {
            const renderRes = render(makeRouterContainer(Component, history, redirectingUrl, requestingUrl));
            container       = renderRes.container;
        });
        expect(history.location.pathname).toEqual(requestingUrl);
    });
});

function makeRouterContainer(Component, history, redirectingPath, requestingPath = '/') {
    return (
        <Router history={history}>
            <Switch>
                <Route path={requestingPath} exact>
                    <Component />
                </Route>
                <Route path={redirectingPath} exact />
            </Switch>
        </Router>
    )
}
