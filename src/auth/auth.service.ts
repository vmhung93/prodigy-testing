import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../users/user.service';

import { Role } from '../common/enums/role.enum';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email, true);
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

    if (user && isPasswordMatch) {
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      };
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(dto: SignUpDto) {
    const saltOrRounds = 10;

    const userDto: CreateUserDto = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash: await bcrypt.hash(dto.password, saltOrRounds),
      roles: [Role.User],
    };

    return this.userService.create(userDto);
  }
}
