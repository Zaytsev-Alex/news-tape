import * as signUpServices from '../../../services/user/signUp';
import signUp from '../signUp';
import store from '../../../store';

describe('signUp action tests', () => {
    let signUpUserServiceMock = null;
    const responseMock        = {data: 'some data'};
    const errorMessage        = 'error';

    beforeEach(() => {
        signUpUserServiceMock = jest.spyOn(signUpServices, 'default');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sign up action should return data, when action is fulfilled', async () => {
        signUpUserServiceMock.mockImplementation(() => Promise.resolve(responseMock));

        const response = await store.dispatch(signUp());

        expect(response.payload).toBe(responseMock.data);
    });

    it('sign in action should return error, when action is rejected', async () => {
        signUpUserServiceMock.mockRejectedValue({data: errorMessage});
        const response = await store.dispatch(signUp());
        expect(response.error).toEqual({message: errorMessage});
    });
});
