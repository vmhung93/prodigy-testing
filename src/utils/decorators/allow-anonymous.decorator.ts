import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANONYMOUS = 'AllowAnonymous';
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS, true);
