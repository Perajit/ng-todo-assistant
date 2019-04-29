import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { verify as jwtVerify } from 'jsonwebtoken';
import { stringify as queryStringify } from 'querystring';

import {
  API_URL,
  APP_URL,
  LINE_CHANNEL_ID,
  FAKE_LINE_CHANNEL_SECRET as LINE_CHANNEL_SECRET,
  FAKE_LINE_AUTH_PROVIDER as LINE_AUTH_PROVIDER,
  FAKE_LINE_TOKEN_API as LINE_TOKEN_API,
} from '../../configs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class AuthService {
  readonly AUTH_API_URL = `${API_URL}/auth`;

  constructor(
    private readonly http: HttpService
  ) { }

  getAuthUrl() {
    const params = {
      response_type: 'code',
      client_id: LINE_CHANNEL_ID,
      redirect_uri: `${this.AUTH_API_URL}/auth-callback`,
      state: Math.random().toString(36).substr(2), // Generate random alphanumeric
      scope: 'openid%20profile',
    };

    return `${LINE_AUTH_PROVIDER}?${queryStringify(params)}`;
  }

  getClientRedirectUrl(params) {
    return `${APP_URL}?${queryStringify(params)}`;
  }

  getToken(authCode: string) {
    const reqUrl = LINE_TOKEN_API;
    const reqData = queryStringify({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: `${this.AUTH_API_URL}/auth-callback`,
      client_id: LINE_CHANNEL_ID,
      client_secret: LINE_CHANNEL_SECRET
    });
    const reqConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return this.http.post(reqUrl, reqData, reqConfig).pipe(
      map((res) => res.data)
    );
  }

  getUserProfile(idToken: string) {
    return this.decodeJwtToken(idToken);
  }

  decodeJwtToken(token: string) {
    return jwtVerify(token, LINE_CHANNEL_SECRET);
  }
}
