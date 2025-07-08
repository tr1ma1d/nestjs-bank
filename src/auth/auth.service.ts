import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async login(res: Response, dto: LoginResponse): Promise<IUser> {
        if (dto.email) {
            return await this.prismaService.users.findFirstOrThrow({
                where: {
                    email: dto.email,
                    password: dto.password
                }
            });
        }
        if (dto.phone) {
            return await this.prismaService.users.findFirstOrThrow({
                where: {
                    phone: dto.phone,
                    password: dto.password
                }
            });
        }
        throw new Error('Either email or phone must be provided');
    }

    async register(dto: RegisterResponse): Promise<IUser> {
        const user: IUser = await this.prismaService.users.create({
            data: {
                fullname: dto.fullname,
                email: dto.email,
                password: dto.password,
                phone: dto.phone
            }
        })
        return user;
    }

    async generateTokens(id: string){
        const payload: JwtPayload = { id };

        
    }
    
    async validate(id: string) {
        const user = await this.prismaService.users.findUnique({
            where: { id: id }
        });
        if (!user) return null;
        return user;
    }

}
