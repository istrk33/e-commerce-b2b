import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async findOne(username: string) {
        return await this.userRepository.findOneBy({ username });
    }
}