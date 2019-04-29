import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AuthStateReducer } from './store/reducers/auth-state.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { FakeLineLoginComponent } from './components/pages/fake-line-login/fake-line-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    FakeLineLoginComponent // FIXME: To be removed after integration with LINE api
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      authState: AuthStateReducer
    }),
    EffectsModule.forRoot([
      AuthEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
