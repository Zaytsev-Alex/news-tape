import {startLoading, stopLoading} from '../reducers/appLoadingSlice';

let _id = 0;

/**
 * Creates blocking UI action
 * @param {function} dispatch
 * @param {function} action  async action function
 * @param {object}   options action options object
 * @returns {Promise}
 */
export default function createBlockingAction(dispatch, action, options = {}) {
    let type = String(action.fulfilled);
    if (type === String(undefined)) {
        type = _id;
        _id += 1;
    }
    dispatch(startLoading(type));
    return dispatch(action(options)).then((data) => {
        if (data.error) {
            throw data.error;
        }
        dispatch(stopLoading(type));
        return data;
    }).catch((error) => {
        dispatch(stopLoading(type));
        throw error;
    });
}
