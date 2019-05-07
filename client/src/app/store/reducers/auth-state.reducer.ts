import {
  AuthVerifySuccessAction,
  AuthVerifyFailureAction,
  AuthAction
} from '../actions/auth.actions';
import {
  AUTH_REDIRECT,
  AUTH_VERIFY_REQUEST,
  AUTH_VERIFY_SUCCESS,
  AUTH_VERIFY_FAILURE
} from '../action-types/auth-action-types';
import { IAuthState } from '../states';

const initialState: IAuthState = {
  data: null,
  error: null,
  isWaiting: false
};

export function AuthStateReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AUTH_REDIRECT:
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
