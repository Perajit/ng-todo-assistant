import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../configs/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly AUTH_TOKEN_STORAGE_KEY = '__TDA_AUTH_TOKEN__';
  readonly AUTH_API_URL = `${API_URL}/auth`;

  private _authToken: string;

  constructor(
    private readonly http: HttpClient
  ) { }

  get authToken() {
    return this._authToken || this.getStoredAuthCode();
  }

  set authToken(authCode: string) {
    this.setStoredAuthCode(authCode);
    this._authToken = authCode;
  }

  redirect() {
    const redirectUrl = `${this.AUTH_API_URL}/redirect`;
    window.location.href = redirectUrl;
  }

  verify() {
    const reqUrl = `${this.AUTH_API_URL}/verify?token=${this.authToken}`;
    return this.http.get(reqUrl);
  }

  private getStoredAuthCode() {
    return sessionStorage.getItem(this.AUTH_TOKEN_STORAGE_KEY);
  }

  private setStoredAuthCode(authToken: string) {
    if (authToken) {
      sessionStorage.setItem(this.AUTH_TOKEN_STORAGE_KEY, JSON.stringify(authToken));
    }
    else {
      sessionStorage.removeItem(this.AUTH_TOKEN_STORAGE_KEY);
    }
  }
}
