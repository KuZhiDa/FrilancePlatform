import type { Status } from 'src/common/constant/status.type';

export class DtoProject {
  usernameExecutor: string;
  usernameCustomer: string;
  projectName: string;
  deadlineDate?: string;
  price: number;
  status: Status;
}
