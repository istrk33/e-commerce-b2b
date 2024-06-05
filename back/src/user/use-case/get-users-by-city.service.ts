import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class GetUsersByCityService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getUsersByCity(city: string) {
        return await this.userRepository.findBy({ birth_city: city });
    }
}