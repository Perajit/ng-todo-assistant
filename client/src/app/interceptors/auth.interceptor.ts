import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    const reqWithAuthHeader = this.cloneWithAuthHeader(req);

    return next.handle(reqWithAuthHeader).pipe(
      catchError((err, caught) => {
        // TODO: Handle error
        return caught;
      })
    );
  }

  private cloneWithAuthHeader(req: HttpRequest<any>) {
    const authToken = this.authService.authToken;

    return req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}`}
    });
  }
}
