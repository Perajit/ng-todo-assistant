import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { default as appRoutes } from './app-routes';

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
