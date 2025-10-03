import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/constant/enumRoles";

export const Role = (...role: Roles[]) => SetMetadata('role', role)