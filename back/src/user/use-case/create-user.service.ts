import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { PasswordHasherService } from '../utils/password-hasher.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';
import { PasswordHasherServiceInterface } from '../utils/password-hasher.service.interface';
// import { PasswordHasherService } from '../utils/password-hasher.service';
export class CreateUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        // private readonly passwordHasherService: PasswordHasherServiceInterface,
        private readonly passwordHasherService: PasswordHasherService
    ) { }

    async createUser(data: UserCreateDto) {

        const userToPersist = {
            ...data,
            password: await this.passwordHasherService.hashPassword(data.password)
        }

        try {
            return this.userRepository.save(userToPersist);
        } catch (e) {
            console.log(error)
            throw new Error("Error while creating user")
        }
    }
}