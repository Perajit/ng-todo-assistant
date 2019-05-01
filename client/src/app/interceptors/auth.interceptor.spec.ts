import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  const authTokenMock = 'fake-auth-token';

  let httpMock: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: 'Window',
          useValue: Window
        },
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

    spyOnProperty(service, 'authToken').and.returnValue(authTokenMock);
  });

  it('should set Authorization header', () => {
    service.verify().subscribe(() => {});

    const reqUrl = `${service.AUTH_API_URL}/verify?token=${authTokenMock}`;
    const httpReq = httpMock.expectOne(reqUrl);

    const actualAuthHeader = httpReq.request.headers.get('Authorization');
    const expectedAuthHeader = `Bearer ${authTokenMock}`;

    expect(actualAuthHeader).toBe(expectedAuthHeader);
  });
});
