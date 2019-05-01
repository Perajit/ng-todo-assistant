import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  const fakeAuthToken = 'fake-auth-token';

  let httpMock: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
    spyOnProperty(service, 'authToken').and.returnValue(fakeAuthToken);
  });

  it('should set Authorization header', () => {
    service.verify().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const reqUrl = (`${service.AUTH_API_URL}/verify?token=${fakeAuthToken}`);
    const httpReq = httpMock.expectOne(reqUrl);

    const actualAuthHeader = httpReq.request.headers.get('Authorization');
    const expectedAuthHeader = `Bearer ${fakeAuthToken}`;
    expect(actualAuthHeader).toBeTruthy(expectedAuthHeader);
  });
});
