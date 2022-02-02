import {restFetch, restFetchWithToken} from '../apiHelper';
import * as storeHelper from '../storeHelper';
import {screen} from '@testing-library/react';

describe('apiHelper tests', () => {
    const responseData   = {};
    const requestUrl     = 'anyUrl';
    const token          = 'TOKEN';
    const defaultHeaders = {
        "Accept":       "application/json",
        "Content-Type": "application/json"
    };

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(responseData));
        jest.spyOn(storeHelper, "selectUserAuthToken").mockImplementation(() => token);
    });

    afterAll(() => {
        global.fetch.mockClear();
        storeHelper.selectUserAuthToken.mockClear();
        delete global.fetch;
    });

    test('request should be made with given url and default rest parameters (method, headers)', () => {
        restFetch(requestUrl);
        expect(global.fetch).toBeCalledWith(
            requestUrl,
            expect.objectContaining({
                                        headers: defaultHeaders,
                                        method:  'get'
                                    })
        );
    });

    test('promise reject should be returned when ok is false in response', () => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(responseData, false));

        expect(() => restFetch(requestUrl)).rejects.toThrow();
    });

    test('error while requesting should be handled and wrapped', () => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub(responseData, false, true));
        expect(
            () => restFetch(requestUrl)
        ).rejects.toThrowError({data: {message: 'Fetch error'}, status: -1});
    });

    test('restFetchWithToken should add token to request', () => {
        restFetchWithToken(requestUrl);
        expect(global.fetch).toBeCalledWith(
            requestUrl,
            expect.objectContaining({
                                        headers: {...defaultHeaders, authorization: `Bearer ${token}`},
                                        method:  'get'
                                    })
        );
    });

    test('restFetchWithToken should add token to request', () => {
        restFetchWithToken(requestUrl);
        expect(global.fetch).toBeCalledWith(
            requestUrl,
            expect.objectContaining({
                                        headers: {...defaultHeaders, authorization: `Bearer ${token}`},
                                        method:  'get'
                                    })
        );
    });

    test('restFetchWithToken shouldn\'t add token to request if token is undefined', () => {
        storeHelper.selectUserAuthToken.mockClear();
        jest.spyOn(storeHelper, "selectUserAuthToken").mockImplementation(() => undefined);
        restFetchWithToken(requestUrl);
        expect(global.fetch).toBeCalledWith(
            requestUrl,
            expect.objectContaining({
                                        headers: defaultHeaders,
                                        method:  'get'
                                    })
        );
    });

    test('post request should be made with body if it is given', () => {
        const requestBody = {key: 'value'};
        restFetch(requestUrl, 'post', requestBody);
        expect(global.fetch).toBeCalledWith(
            requestUrl,
            expect.objectContaining({
                                        headers: defaultHeaders,
                                        method:  'post',
                                        body:    JSON.stringify(requestBody)
                                    })
        );
    });
});

function setupFetchStub(responseData, ok = true, withFetchError = false) {
    return function fetchStub(_url) {
        return new Promise((resolve, reject) => {
            if (withFetchError) {
                reject({});
            }
            else {
                resolve({
                            text: () =>
                                      Promise.resolve({
                                                          responseData,
                                                      }),
                            ok:   ok
                        });
            }
        })
    }
}
