import createBlockingAction from './blockingAction';
import {setError} from '../reducers/appErrorSlice';

/**
 * Creates action that handles error and shows global error popup
 * @param {function} dispatch dispatch function
 * @param {function} action   async action function
 * @param {*}        options  action options
 * @param {boolean}  blockUI  should UI be blocked
 * @returns {*}
 */
const createErrorCatchingAction = (dispatch, action, options, blockUI = true) => {
    let _dispatchActionFunction = () => dispatch(action(options));
    if (blockUI) {
        _dispatchActionFunction = () => createBlockingAction(dispatch, action, options);
    }
    return _dispatchActionFunction()
        .then((data) => {
            return data;
        })
        .catch((_error) => {
            dispatch(setError(_error.message));
            return _error;
        });
};

export default createErrorCatchingAction;
