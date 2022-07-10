import store from '../store';
import {selectUserAuthToken} from './storeHelper';

/**
 * Fetch data from rest api service with token in request header
 * @param {string}  url        Service url path.
 * @param {string}  method     Http method name.
 * @param {object}  objectBody Content of request.
 * @param {object}  headers    Headers of request.
 * @return {Promise} Promise object of fetch request.
 */
export function restFetchWithToken(url, method = 'get', objectBody = {}, headers = {}) {
    headers = _addToken(headers);
    return restFetch(url, method, objectBody, headers);
}

/**
 * Adds an application auth token to the request headers.
 * @param {object} headers Headers of http request.
 * @return {object} Headers of http request.
 */
function _addToken(headers ) {
    const storeState    = store.getState();
    const authorization = selectUserAuthToken(storeState);
    if (authorization) {
        headers.authorization = `Bearer ${authorization}`;
    }
    return headers;
}

/**
 * Fetch data from rest api service
 * @param {string} url        Service url path.
 * @param {string} method     Http method name.
 * @param {object} objectBody Content of request.
 * @param {object} headers    Headers of request.
 * @return {Promise} Promise object of fetch request.
 */
export function restFetch(url, method = 'get', objectBody = null, headers = {}) {
    const body = JSON.stringify(objectBody);
    headers    = _addCommonHeaders(headers);

    return _fetch(url, method, body, headers);
}

/**
 * Adds common headers of request.
 * @param {object} headers Headers of http request.
 * @return {object} Headers of http request.
 */
function _addCommonHeaders(headers) {
    headers.Accept          = 'application/json';
    headers['Content-Type'] = 'application/json';
    return headers;
}


/**
 * Sends http request
 * @param {string}          url     Url path.
 * @param {string}          method  Http method name.
 * @param {string | object} body    Body of request.
 * @param {object}          headers Headers of request.
 * @return {Promise} Fetch promise.
 */
function _fetch(url, method, body, headers) {
    const config = {
        method:  method,
        headers: headers
    };
    if (method !== 'get') {
        config.body = body;
    }
    return fetch(url, config)
        .catch(_wrapFetchError)
        .then(_addDataToResponse)
        .then(_convertHttpErrorResponseToError);
}

/**
 * Wraps Error to response object and throws it.
 * @param {Error} error Error of fetch.
 */
function _wrapFetchError(error) {
    throw {
        status: -1,
        data:   {message: 'Fetch error', ...error}
    };
}

/**
 * Adds fetch response data, which represents response body in json
 * @param {Response} response Response global fetch.
 * @return {Promise} Fetch promise.
 */
function _addDataToResponse(response) {
    return new Promise((resolve) => {
        response.text()
                .then((payload) => {
                    try {
                        response.data = JSON.parse(payload);
                    }
                    catch (e) {
                        response.data = payload;
                    }
                    resolve(response);
                });
    });
}

/**
 * Converts a response with response.ok != true to error.
 * @param {Response} response Response global fetch..
 * @return {Promise} Fetch promise.
 */
function _convertHttpErrorResponseToError(response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(response);
}
