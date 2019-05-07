import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { IAuthState } from '../store/states';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authState$: Observable<IAuthState>;

  constructor(
    private readonly router: Router,
    private readonly store: Store<IAuthState>
  ) {
    this.authState$ = this.store.select('authState');
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.authState$.pipe(
      map((state) => !!state.data),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.redirectToLogin(route);
        }
      })
    );
  }

  private redirectToLogin(route: ActivatedRouteSnapshot) {
    const queryParams = route.queryParams;
    this.router.navigate(['/login'], { queryParams });
  }
}
