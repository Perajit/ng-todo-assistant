import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, map, take, tap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { AuthService } from 'src/app/services/auth.service';
import {
  AuthVerifyRequestAction,
  AuthVerifySuccessAction,
  AuthVerifyFailureAction
} from '../actions/auth.actions';
import {
  AUTH_REDIRECT,
  AUTH_VERIFY_REQUEST
} from '../action-types/auth-action-types';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private readonly action$: Actions,
    private readonly store: Store<any>, // FIXME
    private readonly authService: AuthService
  ) { }

  @Effect()
  redirect$: Observable<Action> = this.action$.pipe(
    ofType(AUTH_REDIRECT),
    take(1),
    tap(() => {
      this.authService.redirect();
    })
  );

  @Effect()
  verify$: Observable<Action> = this.action$.pipe(
    ofType(AUTH_VERIFY_REQUEST),
    mergeMap((action: AuthVerifyRequestAction) => {
      const authToken = action.payload;

      return this.authService.verify(authToken).pipe(
        tap(() => this.authService.authToken = authToken)
      );
    }),
    map((user) => {
      return new AuthVerifySuccessAction(user);
    }),
    catchError((err, caught) => {
      this.store.dispatch(new AuthVerifyFailureAction(err));
      return caught;
    })
  );
}
