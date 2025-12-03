import type { Status } from 'src/common/constant/status.type';

export class GetDto {
  executorId?: number;
  customerId?: number;
  status?: Status;
}
