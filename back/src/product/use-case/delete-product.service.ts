import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class DeleteProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async deleteProduct(id: number) {
        return await this.productRepository.delete(id);
    }
}