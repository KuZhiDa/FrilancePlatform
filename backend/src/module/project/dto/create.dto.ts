export class CreateDto {
  executorId: number;
  customerId: number;
  projectName: string;
  deadlineDate?: string;
  price: number;
}
