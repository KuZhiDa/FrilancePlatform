import { Model } from 'sequelize-typescript';
import type { Status } from 'src/common/constant/status.type';
import { User } from './users.model';
interface InterfaceProject {
    projectName: string;
    executorId: number;
    customerId: number;
    deadlineDate?: string;
    price: number;
}
export declare class orderProject extends Model<orderProject, InterfaceProject> {
    projectName: string;
    executorId: number;
    customerId: number;
    status: Status;
    deadlineDate?: string | null;
    price: number;
    executor: User;
    customer: User;
}
export {};
