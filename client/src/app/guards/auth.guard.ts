import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authState$: Observable<any>; // TODO: Handle typing

  constructor(
    private readonly router: Router,
    private readonly store: Store<any> // TODO: Handle typing
  ) {
    this.authState$ = store.select('authState');
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.authState$.pipe(
      take(1),
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
