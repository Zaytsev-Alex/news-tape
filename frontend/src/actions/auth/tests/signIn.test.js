import * as signInServices from '../../../services/auth/signIn';
import signIn from '../signIn';
import store from '../../../store';

describe('signIn action tests', () => {
    let signInUserServiceMock = null;
    const responseMock        = {data: 'some data'};
    const errorMessage        = 'error';
    const userData            = {firstName: 'first name', lastName: 'last name'};

    beforeEach(() => {
        signInUserServiceMock = jest.spyOn(signInServices, 'default');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sign in action should return data, when action is fulfilled', async () => {
        signInUserServiceMock.mockImplementation(() => Promise.resolve(responseMock));

        const response = await store.dispatch(signIn(userData));

        expect(response.payload).toBe(responseMock.data);
    });

    it('sign in action should return error, when action is rejected', async () => {
        signInUserServiceMock.mockRejectedValue({data: errorMessage});
        const response = await store.dispatch(signIn(userData));
        expect(response.error).toEqual({message: errorMessage});
    });

    it('sign in action should call service with correct parameters', async () => {
        await store.dispatch(signIn(userData));
        expect(signInUserServiceMock).toBeCalledWith(userData);
    });
});
