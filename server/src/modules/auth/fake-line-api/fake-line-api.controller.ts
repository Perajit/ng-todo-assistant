import { Controller, Get, Post, Query, HttpService, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { of } from 'rxjs';
import { sign } from 'jsonwebtoken';
import { stringify as queryStringify } from 'querystring';

import { default as fakeLineUser } from './fake-line-user';
import { FAKE_LINE_CHANNEL_SECRET } from 'src/configs';

@Controller('fake-line-api')
export class FakeLineApiController {
  constructor(
    private readonly http: HttpService
  ) { }

  @Get('auth-callback')
  fakeAuthCallback(
    @Query('redirect_uri') redirectUri,
    @Query('state') state,
    @Res() res: Response
  ) {
    const fakeParams = {
      code: 'fake-auth-code',
      state,
      friendship_status_changed: false
    };
    res.redirect(302, `${redirectUri}?${queryStringify(fakeParams)}`);
  }

  @Post('token')
  fakeGetToken(
    @Body() body
  ) {
    const fakeParams = {
      access_token: 'fake-access-token',
      expires_in: 2592000,
      id_token: this.getToken(),
      refresh_token: 'fake-refresh-token',
      scope: 'profile',
      token_type: 'Bearer'
    };

    return of(fakeParams);
  }

  getToken() {
    return sign(fakeLineUser, FAKE_LINE_CHANNEL_SECRET);
  }
}
