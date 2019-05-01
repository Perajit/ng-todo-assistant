import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../configs/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly AUTH_TOKEN_STORAGE_KEY = '__TDA_AUTH_TOKEN__';
  readonly AUTH_API_URL = `${API_URL}/auth`;

  private currentAuthToken: string;

  constructor(
    private readonly http: HttpClient,
    @Inject('Window') private window: Window
  ) { }

  get authToken() {
    return this.currentAuthToken || this.getStoredAuthCode();
  }

  set authToken(authCode: string) {
    this.setStoredAuthCode(authCode);
    this.currentAuthToken = authCode;
  }

  redirect() {
    const redirectUrl = `${this.AUTH_API_URL}/redirect`;
    this.window.location.href = redirectUrl;
  }

  verify() {
    const reqUrl = `${this.AUTH_API_URL}/verify?token=${this.authToken}`;

    return this.http.get(reqUrl);
  }

  private getStoredAuthCode() {
    const sessionStorage = this.window.sessionStorage;

    return sessionStorage.getItem(this.AUTH_TOKEN_STORAGE_KEY);
  }

  private setStoredAuthCode(authToken: string) {
    const sessionStorage = this.window.sessionStorage;

    if (authToken) {
      sessionStorage.setItem(this.AUTH_TOKEN_STORAGE_KEY, authToken);
    }
    else {
      sessionStorage.removeItem(this.AUTH_TOKEN_STORAGE_KEY);
    }
  }
}
