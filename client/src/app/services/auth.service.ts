import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../configs/endpoints';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly AUTH_TOKEN_STORAGE_KEY = '__TDA_AUTH_TOKEN__';
  readonly AUTH_API_URL = `${API_URL}/auth`;

  private currentAuthToken: string;

  constructor(
    private readonly http: HttpClient,
    @Inject('Window') private readonly window: Window
  ) { }

  get authToken() {
    return this.currentAuthToken || this.getStoredAuthToken();
  }

  set authToken(authToken: string) {
    this.setStoredAuthToken(authToken);
    this.currentAuthToken = authToken;
  }

  redirect() {
    const redirectUrl = `${this.AUTH_API_URL}/redirect`;
    this.window.location.href = redirectUrl;
  }

  verify(authToken) {
    const reqUrl = `${this.AUTH_API_URL}/verify?token=${authToken}`;

    return this.http.get(reqUrl) as Observable<User>;
  }

  private getStoredAuthToken() {
    const sessionStorage = this.window.sessionStorage;

    return sessionStorage.getItem(this.AUTH_TOKEN_STORAGE_KEY);
  }

  private setStoredAuthToken(authToken: string) {
    const sessionStorage = this.window.sessionStorage;

    if (authToken) {
      sessionStorage.setItem(this.AUTH_TOKEN_STORAGE_KEY, authToken);
    }
    else {
      sessionStorage.removeItem(this.AUTH_TOKEN_STORAGE_KEY);
    }
  }
}
