import { Action } from '@ngrx/store';

import {
  AUTH_REDIRECT,
  AUTH_SET_TOKEN,
  AUTH_VERIFY_REQUEST,
  AUTH_VERIFY_SUCCESS,
  AUTH_VERIFY_FAILURE
} from '../action-types/auth-action-types';

export class AuthRedirectAction implements Action {
  readonly type = AUTH_REDIRECT;
}

export class AuthSetTokenAction implements Action {
  readonly type = AUTH_SET_TOKEN;

  constructor(
    public payload: string
  ) { }
}

export class AuthVerifyRequestAction implements Action {
  readonly type = AUTH_VERIFY_REQUEST;
}

export class AuthVerifySuccessAction implements Action {
  readonly type = AUTH_VERIFY_SUCCESS;

  constructor(
    public payload: any // TODO: Handle typing
  ) { }
}

export class AuthVerifyFailureAction implements Action {
  readonly type = AUTH_VERIFY_FAILURE;

  constructor(
    public payload: any // TODO: Handle typing
  ) { }
}

export type AuthAction = (
  | AuthRedirectAction
  | AuthSetTokenAction
  | AuthVerifyAction
);

export type AuthVerifyAction = (
  | AuthVerifyRequestAction
  | AuthVerifySuccessAction
  | AuthVerifyFailureAction
);
