import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { User } from '@prisma/client';


export const Authorizated = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request

        const user = request.user;

        return data ? user![data] : user;
    }
)