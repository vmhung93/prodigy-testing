import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { RolesGuard } from '../guards/role.guard';

import { ROLES_KEY } from './role.decorator';

import { Role } from '../../common/enums/role.enum';

export function Auth(...roles: Role[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
}
