import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

import { AuthGuard } from './auth.guard';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

interface IAuthState {
  isLoading: boolean;
  error: any;
  data: any;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore<any>;
  let router: Router;

  const initialAuthState: IAuthState = {
    isLoading: false,
    error: null,
    data: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideMockStore({
          initialState: { authState: initialAuthState }
        })
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
  });

  beforeEach(() => {
    guard = TestBed.get(AuthGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate()', () => {
    const routeMock: any = {
      queryParams: {
        token: 'fake-auth-token'
      }
    };

    describe('when user is not logged in', () => {
      it('should return false', () => {
        const expected = cold('(a|)', { a: false });

        expect(guard.canActivate(routeMock)).toBeObservable(expected);
      });

      it('should redirect to login page', () => {
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
      const userMock = {
        name: 'Fake Name'
      };

      beforeEach(() => {
        store.setState({
          authState: {
            ...initialAuthState,
            data: userMock
          }
        });
      });

      it('should return true if user is logged in', () => {
        const expected = cold('(a|)', { a: true });

        expect(guard.canActivate(routeMock)).toBeObservable(expected);
      });
    });
  });
});
