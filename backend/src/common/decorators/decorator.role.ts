import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/common/constant/roles';

export const Role = (...role: Roles[]) => SetMetadata('role', role);
