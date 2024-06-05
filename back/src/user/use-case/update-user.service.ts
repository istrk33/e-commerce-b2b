import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { PasswordHasherService } from '../utils/password-hasher.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';
import { PasswordHasherServiceInterface } from '../utils/password-hasher.service.interface';
import { UserUpdateDto } from '../dto/user-update.dto';
// import { PasswordHasherService } from '../utils/password-hasher.service';
export class UpdateUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        // private readonly passwordHasherService: PasswordHasherServiceInterface,
        private readonly passwordHasherService: PasswordHasherService
    ) { }

    async updateUser(id: number, data: UserUpdateDto) {
        const user = await this.userRepository.findOneBy({ id });
        const userUpdate = { ...user, ...data };
        await this.userRepository.save(userUpdate);

        return userUpdate;
    }
}