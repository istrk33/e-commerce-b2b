import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class GetAllProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async getAllproducts() {
        return await this.productRepository.find();
    }
}