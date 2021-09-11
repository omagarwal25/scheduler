import {
  Controller,
  Post,
  Response,
  Request,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Request() req, @Response() res) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    } else {
      const cookie = await this.authService.login(user);
      res.setHeader('Set-Cookie', cookie);
      return res.send({ message: 'Auth Approved' });
    }
  }
}
