import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  const authTokenMock = 'fake-auth-token';
  const windowMock = {
    location: {
      href: 'fake-location',
    },
    sessionStorage: jasmine.createSpyObj('sessionStorage', [
      'getItem',
      'setItem'
    ])
  } as Window;
  const getItemSpy = windowMock.sessionStorage.getItem as jasmine.Spy;
  const setItemSpy = windowMock.sessionStorage.setItem as jasmine.Spy;

  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: 'Window',
        useFactory: (() => windowMock)
      }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    getItemSpy.calls.reset();
    setItemSpy.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authToken', () => {

    describe('get', () => {
      it('should return latest set value', () => {
        service.authToken = authTokenMock;

        expect(service.authToken).toBe(authTokenMock);
      });

      it('should return stored token from storage if value is not set', () => {
        getItemSpy.and.returnValue(authTokenMock);

        expect(service.authToken).toBe(authTokenMock);
      });
    });

    describe('set', () => {
      it('should store token to storage', () => {
        service.authToken = authTokenMock;

        expect(setItemSpy).toHaveBeenCalledWith(service.AUTH_TOKEN_STORAGE_KEY, authTokenMock);
      });

      it('should update current value', () => {
        getItemSpy.and.returnValue(null); // Force storage not to have stored value

        service.authToken = authTokenMock;

        expect(service.authToken).toBe(authTokenMock);
      });
    });
  });

  describe('redirect()', () => {
    it('should redirect to auth endpoint', () => {
      service.redirect();

      const actualLocation = windowMock.location.href;
      const expectedRedirectUrl = `${service.AUTH_API_URL}/redirect`;

      expect(actualLocation).toEqual(expectedRedirectUrl);
    });
  });

  describe('verify()', () => {
    beforeEach(() => {
      spyOnProperty(service, 'authToken').and.returnValue(authTokenMock);
    });

    it('should sent GET request to verify token', () => {
      service.verify().subscribe(() => { });

      const expectedReqUrl = `${service.AUTH_API_URL}/verify?token=${authTokenMock}`;
      const httpReq = httpMock.expectOne(expectedReqUrl);

      expect(httpReq.request.method).toBe('GET');
    });
  });
});
