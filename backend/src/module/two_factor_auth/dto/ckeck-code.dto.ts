import type { Role } from 'src/common/constant/roles';

export class DtoCheckCode {
  id: number;

  role: Role;

  code: string;
}
