import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { User } from '../schemas/user.schema';

import { Auth } from '../utils/decorators/auth.decorator';
import { AllowAnonymous } from '../utils/decorators/allow-anonymous.decorator';

import { Role } from '../common/enums/role.enum';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Auth(Role.Admin)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @AllowAnonymous()
  @Put('upgrade-permission')
  async upgrade(@Body() dto: any) {
    return await this.userService.updateRoles(dto.userId, [
      Role.User,
      Role.Admin,
    ]);
  }
}
