import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class GetOneProductByIdService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async getOneProductById(id: number) {
        return await this.productRepository.findOneBy({ id });
    }
}