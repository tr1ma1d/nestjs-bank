import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async findAll(): Promise<IUser[]> {
        let users: IUser[] = await this.prismaService.users.findMany();
        return users;
    }

    async findById(dto: Pick<IUser, 'id'>): Promise<IUser> {
        let { id } = dto;
        let user = await this.prismaService.users.findFirstOrThrow({
            where: {
                id: id,
            }
        });
        return user;
    }

    async findByName(dto: Pick<IUser, 'fullname'>): Promise<IUser> {
        let { fullname } = dto;
        let user = await this.prismaService.users.findFirstOrThrow({
            where: {
                fullname: fullname,
            }
        });
        return user;
    }

    async findByPhone(dto: Pick<IUser, 'phone'>): Promise<IUser> {
        let { phone } = dto;
        let user = await this.prismaService.users.findFirstOrThrow({
            where: {
                phone: phone,
            }
        });
        return user;
    }

    async createUsers(dto: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser> {
        let user: IUser = await this.prismaService.users.create({
            data: {
                fullname: dto.fullname,
                password: dto.password,
                phone: dto.phone,
                email: dto.email,
            }
        });
        return user;
    }

    async deleteUser(dto: Pick<IUser, 'id'>) {
        return await this.prismaService.users.delete({
            where: {
                id: dto.id,
            }
        })
    }

    async updateUser(dto: Omit<IUser, 'createdAt'>): Promise<IUser> {
        return await this.prismaService.users.update({
            where: {
                id: dto.id,
            },
            data: {
                fullname: dto.fullname,
                password: dto.password,
                phone: dto.phone,
                email: dto.email
            }
        })

    }
}

