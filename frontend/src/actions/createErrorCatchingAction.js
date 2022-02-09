import createBlockingAction from './blockingAction';
import {setError} from '../reducers/appErrorSlice';
import {logout} from '../reducers/userAuthSlice';

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

            if (_shouldForceLogout(_error)) {
                dispatch(logout());
            }

            return _error;
        });
};

function _shouldForceLogout(error) {
    return error.message === 'Unauthorized';
}

export default createErrorCatchingAction;
