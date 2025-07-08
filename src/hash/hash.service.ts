import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { verify } from 'argon2';

@Injectable()
export class HashService {
    constructor(private readonly configService: ConfigService){}
    
    async hash(data: string): Promise<string> {
        return argon2.hash(data, {
            type: argon2.argon2id,
            memoryCost: this.configService.get<number>('ARGON2_MEMORY_COST'),
            timeCost: this.configService.get<number>('ARGON2_TIME_COST'),
            parallelism: this.configService.get<number>('ARGON2_PARALLELISM'),
        });
    }

    async verifyPassword(password: string, passwordHash: string) : Promise<boolean>{
        return verify(password, passwordHash);
    }
}