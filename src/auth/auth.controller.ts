import * as _ from 'lodash';
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './local/local-auth.guard';

import { AllowAnonymous } from '../utils/decorators/allow-anonymous.decorator';

import { AuthService } from './auth.service';

import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: SignInDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @AllowAnonymous()
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const user = await this.authService.signUp(dto);

    return {
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
