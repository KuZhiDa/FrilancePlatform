import type { Status } from 'src/common/constant/status.type';
export declare class DtoProject {
    usernameExecutor: string;
    usernameCustomer: string;
    projectName: string;
    deadlineDate?: string;
    price: number;
    status: Status;
}
