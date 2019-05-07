import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LoginPageComponent } from './login-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { IAppStates, IAuthState } from 'src/app/store/states';
import { AuthRedirectAction, AuthVerifyRequestAction } from 'src/app/store/actions/auth.actions';

describe('LoginPageComponent', () => {
  const initialAuthState: IAuthState = {
    data: null,
    error: null,
    isWaiting: false
  };
  const authServiceMock = {
    authToken: null,
    redirect: jasmine.createSpy(),
    verify: jasmine.createSpy()
  };

  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let store: MockStore<IAppStates>;
  let dispatch: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        provideMockStore({
          initialState: { authState: initialAuthState }
        }),
        {
          provide: AuthService,
          useFactory: (() => authServiceMock)
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    store = TestBed.get(Store);

    dispatch = spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    authServiceMock.verify.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when not having token as query param', () => {
    it('should dispatch AuthRedirectAction', () => {
      const expectedAction = new AuthRedirectAction();
      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('when having token as query param', () => {
    it('should dispatch AuthVerifyRequestAction', () => {
      const tokenMock = 'fake-auth-token';

      route.snapshot = { queryParams: { token: tokenMock } } as any;
      store.setState({
        authState: { isWaiting: false, data: null, error: null }
      });

      const expectedAction = new AuthVerifyRequestAction(tokenMock);
      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('when user is logged in', () => {
    it('should redirect to landing page', () => {
      const userMock = { name: 'Fake Name' };

      spyOn(router, 'navigate');

      store.setState({
        authState: { ...initialAuthState, data: userMock }
      });

      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
