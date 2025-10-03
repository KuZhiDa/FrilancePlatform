import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request, NextFunction } from "express";
export declare class MiddlewareAuthJwt implements NestMiddleware {
    private jwt;
    constructor(jwt: JwtService);
    use(req: Request, next: NextFunction): Promise<void>;
}
