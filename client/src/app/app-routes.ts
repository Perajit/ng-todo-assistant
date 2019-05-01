import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

// FIXME: To be removed after integration with LINE api
import { FakeLineLoginComponent } from './components/pages/fake-line-login/fake-line-login.component';

export default [
  // FIXME: To be removed after integration with LINE api
  {
    path: 'fake-line-login',
    component: FakeLineLoginComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
] as Routes;
