import type { Role } from 'src/common/constant/roles';

export class DtoFor2FaReturn {
  id_user: number;
  role: Role;
  is2Fa: boolean;
  accessToken?: string;
  refreshToken?: string;
  message: string;
}
