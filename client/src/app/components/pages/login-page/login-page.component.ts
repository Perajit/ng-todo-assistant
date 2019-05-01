import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthRedirectAction, AuthSetTokenAction } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  authState$: Observable<any>; // TODO: Handle typing

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<any> // TODO: Handle typing
  ) {
    this.authState$ = store.select('authState');
  }

  ngOnInit() {
    this.subscribeAuthState();
  }

  private subscribeAuthState() {
    this.authState$.subscribe((authState) => {
      const { data, error, isWaiting } = authState;

      if (data) {
        this.handleLoginSuccess();
      }
      else if (error) {
        this.handleLoginFailure(error);
      }
      else if (!isWaiting) {
        const { token } = this.route.snapshot.queryParams;

        if (token) {
          this.store.dispatch(new AuthSetTokenAction(token));
        }
        else {
          this.store.dispatch(new AuthRedirectAction());
        }
      }
    });
  }

  private handleLoginSuccess() {
    this.router.navigate(['/']);
  }

  private handleLoginFailure(error) {
    // TODO: Handle error
    console.error(error);
  }
}
