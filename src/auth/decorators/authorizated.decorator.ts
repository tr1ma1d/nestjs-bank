import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { Users } from "generated/prisma";


export const Authorizated = createParamDecorator(
    (data: keyof Users, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request

        const user = request.user;

        return data ? user![data] : user;
    }
)