import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body()
    body: {
      email: string;
      id: string | number;
      name?: string;
      login: string;
    },
  ) {
    const user = await this.usersService.findOneByEmail(body.email);

    if (user) return this.authService.login(user);
    else {
      const newUser = await this.usersService.create({
        username: body.login,
        name: body.name ? body.name : undefined,
        thirdPartyId: body.id ? String(body.id) : undefined,
        email: body.email,
      });
      return await this.authService.login(newUser);
    }
  }
}
