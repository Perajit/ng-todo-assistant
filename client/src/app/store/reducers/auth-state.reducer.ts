import {
  AuthVerifySuccessAction,
  AuthVerifyFailureAction,
  AuthAction
} from '../actions/auth.actions';
import {
  AUTH_REDIRECT,
  AUTH_SET_TOKEN,
  AUTH_VERIFY_REQUEST,
  AUTH_VERIFY_SUCCESS,
  AUTH_VERIFY_FAILURE
} from '../action-types/auth-action-types';

const initialState = {
  data: null,
  error: null,
  isWaiting: false
};

export function AuthStateReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AUTH_REDIRECT:
      return {
        ...initialState,
        isWaiting: true
      };
    case AUTH_SET_TOKEN:
      return {
        ...initialState,
        isWaiting: true
      };
    case AUTH_VERIFY_REQUEST:
      return {
        ...initialState,
        isWaiting: true
      };
    case AUTH_VERIFY_SUCCESS:
      return {
        ...initialState,
        data: (action as AuthVerifySuccessAction).payload
      };
    case AUTH_VERIFY_FAILURE:
      return {
        ...initialState,
        error: (action as AuthVerifyFailureAction).payload
      };
    default:
      return { ...initialState };
  }
}
