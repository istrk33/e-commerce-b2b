import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class GetUserByIdService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getUserById(id: number) {
        return await this.userRepository.findOneBy({ id: id });
    }
}