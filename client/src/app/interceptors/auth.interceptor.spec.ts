import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { API_URL } from '../configs/endpoints';

describe('AuthInterceptor', () => {
  const authTokenMock = 'fake-auth-token';

  let httpMock: HttpTestingController;
  let http: HttpClient;
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
    http = TestBed.get(HttpClient);
    service = TestBed.get(AuthService);

    spyOnProperty(service, 'authToken').and.returnValue(authTokenMock);
  });

  it('should set Authorization header', fakeAsync(() => {
    const reqUrl = `${API_URL}/path`;

    http.get(reqUrl).toPromise();

    tick();

    const httpReq = httpMock.expectOne(reqUrl);
    const actualAuthHeader = httpReq.request.headers.get('Authorization');
    const expectedAuthHeader = `Bearer ${authTokenMock}`;

    expect(actualAuthHeader).toBe(expectedAuthHeader);
  }));
});
