import { applyDecorators, UseGuards } from "@nestjs/common";
import { UserGuard } from "../guards/user.guard";



export default function Authorization(){
    return applyDecorators(UseGuards(UserGuard))
}


