import { Action } from '@ngrx/store';

import {
  AUTH_REDIRECT,
  AUTH_VERIFY_REQUEST,
  AUTH_VERIFY_SUCCESS,
  AUTH_VERIFY_FAILURE
} from '../action-types/auth-action-types';
import { User } from 'src/app/models/user';

export class AuthRedirectAction implements Action {
  readonly type = AUTH_REDIRECT;
}

export class AuthVerifyRequestAction implements Action {
  readonly type = AUTH_VERIFY_REQUEST;
  constructor(public payload: string) { }
}

export class AuthVerifySuccessAction implements Action {
  readonly type = AUTH_VERIFY_SUCCESS;
  constructor(public payload: User) { }
}

export class AuthVerifyFailureAction implements Action {
  readonly type = AUTH_VERIFY_FAILURE;
  constructor(public payload: any) { } // TODO: Handle typing
}

export type AuthAction = (
  | AuthRedirectAction
  | AuthVerifyAction
);

export type AuthVerifyAction = (
  | AuthVerifyRequestAction
  | AuthVerifySuccessAction
  | AuthVerifyFailureAction
);
