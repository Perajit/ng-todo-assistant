import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { AuthGuard } from './auth.guard';
import { IAppStates, IAuthState } from '../store/states';
import { LoginPageComponent } from '../components/pages/login-page/login-page.component';

describe('AuthGuard', () => {
  const initialAuthState: IAuthState = {
    data: null,
    error: null,
    isWaiting: false
  };

  let guard: AuthGuard;
  let router: Router;
  let store: MockStore<IAppStates>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginPageComponent },
        ])
      ],
      providers: [
        AuthGuard,
        provideMockStore({
          initialState: { authState: initialAuthState }
        })
      ]
    });
  });

  beforeEach(() => {
    guard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate()', () => {
    describe('when user is not logged in', () => {
      const routeMock: any = {
        queryParams: {
          token: 'fake-auth-token'
        }
      };

      it('should return false', () => {
        const expected = cold('(a)', { a: false });

        expect(guard.canActivate(routeMock)).toBeObservable(expected);
      });

      it('should redirect to login page with current query params', () => {
        spyOn(router, 'navigate');

        guard.canActivate(routeMock).subscribe(() => {
          expect(router.navigate).toHaveBeenCalledWith(
            ['/login'],
            { queryParams: routeMock.queryParams }
          );
        });
      });
    });

    describe('when user is logged in', () => {
      const routeMock: any = {};
      const userMock = { name: 'Fake Name' };

      beforeEach(() => {
        store.setState({
          authState: { ...initialAuthState, data: userMock }
        });
      });

      it('should return true if user is logged in', () => {
        const expected = cold('(a)', { a: true });

        expect(guard.canActivate(routeMock)).toBeObservable(expected);
      });
    });
  });
});
