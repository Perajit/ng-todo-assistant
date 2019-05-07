import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRedirectAction, AuthVerifyRequestAction, AuthVerifySuccessAction, AuthVerifyFailureAction } from '../actions/auth.actions';

describe('AuthEffects', () => {
  const authServiceMock = {
    authToken: null,
    redirect: jasmine.createSpy(),
    verify: jasmine.createSpy()
  };

  let effects: AuthEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({})
    ],
    providers: [
      Store,
      provideMockActions(() => actions),
      {
        provide: AuthService,
        useFactory: (() => authServiceMock)
      }
    ]
  }));

  beforeEach(() => {
    effects = TestBed.get(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('redirect$', () => {
    it('should call auth redirect service', () => {
      const action = new AuthRedirectAction();

      actions = new ReplaySubject(1);
      actions.next(action);

      effects.redirect$.subscribe(() => {
        expect(authServiceMock.redirect).toHaveBeenCalled();
      });
    });
  });

  describe('verify$', () => {
    const authTokenMock = 'fake-auth-token';
    const errorMessageMock = 'Fake Error';
    const action = new AuthVerifyRequestAction(authTokenMock);

    it('should call auth verify service', () => {
      actions = new ReplaySubject(1);
      actions.next(action);

      effects.redirect$.subscribe(() => {
        expect(authServiceMock.verify).toHaveBeenCalledWith(authTokenMock);
      });
    });

    describe('when request succeeds', () => {
      const userMock = { name: 'Fake Name' };

      beforeEach(() => {
        authServiceMock.verify.and.returnValue(userMock);
      });

      it('should dispatch AuthVerifySuccessAction', () => {
        actions = new ReplaySubject(1);
        actions.next(action);

        effects.redirect$.subscribe((actualNextAction) => {
          const expectedNextAction = new AuthVerifySuccessAction(userMock);
          expect(actualNextAction).toEqual(expectedNextAction);
        });
      });

      it('should set auth token', () => {
        actions = new ReplaySubject(1);
        actions.next(action);

        effects.redirect$.subscribe(() => {
          expect(authServiceMock.authToken).toHaveBeenCalledWith(authTokenMock);
        });
      });
    });

    describe('when request fails', () => {
      it('should dispatch AuthVerifyFailureAction', () => {
        authServiceMock.verify.and.throwError(errorMessageMock);

        actions = new ReplaySubject(1);
        actions.next(action);

        effects.redirect$.subscribe((actualNextAction) => {
          const expectedNextAction = new AuthVerifyFailureAction(errorMessageMock);
          expect(actualNextAction).toEqual(expectedNextAction);
        });
      });
    });
  });
});
