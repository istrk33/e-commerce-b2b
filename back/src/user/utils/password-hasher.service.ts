import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
export class PasswordHasherService {

    async hashPassword(pwd: string) {
        const saltOrRounds = 10;
        const passwordHashed = await bcrypt.hash(pwd, saltOrRounds);

        return passwordHashed;
    }

    async checkPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}