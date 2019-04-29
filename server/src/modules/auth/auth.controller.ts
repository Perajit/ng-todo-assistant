import { Controller, Get, Res, Body, Query, HttpCode, Req, Post } from '@nestjs/common';
import { Request, Response, CookieOptions } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Get('redirect')
  redirectToAuthProvider(
    @Res() res: Response
  ) {
    const authUrl = this.authService.getAuthUrl();
    res.redirect(302, authUrl);
  }

  @Get('auth-callback')
  processAuthProviderResponse(
    @Res() res: Response,
    @Query('code') code: string
  ) {
    this.authService.getToken(code).subscribe((tokenData) => {
      res.redirect(this.authService.getClientRedirectUrl({
        token: tokenData.id_token
      }));
    });
  }

  @Get('verify')
  verifyUser(
    @Req() req: Request,
    @Query('token') idToken: string
  ) {
    return this.authService.getUserProfile(idToken);
  }
}
