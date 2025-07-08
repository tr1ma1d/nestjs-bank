import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    private readonly REFRESH_TOKEN: string;
    private readonly ACCESS_TOKEN: string;
    private readonly COOKIE_DOMAIN: string;
    constructor(private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService
    ) {
        this.ACCESS_TOKEN = this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
        this.REFRESH_TOKEN = this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
        this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('COOKIE_DOMAIN');
    }

    async login(res: Response, dto: LoginRequest): Promise<IUser> {
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

    async register(dto: RegisterRequest) {
        const hashedPassword = await this.hashService.hash(dto.password);
        const user: IUser = await this.prismaService.users.create({
            data: {
                fullname: dto.fullname,
                email: dto.email,
                password: dto.password,
                phone: dto.phone
            }
        })
        return this.generateTokens(user.id);
    }

    async generateTokens(id: string) {
        const payload: JwtPayload = { id };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.ACCESS_TOKEN,
        })
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.REFRESH_TOKEN,
        })

        return { accessToken, refreshToken };
    }

    async validate(id: string) {
        const user = await this.prismaService.users.findUnique({
            where: { id: id }
        });
        if (!user) return null;
        return user;
    }

}
