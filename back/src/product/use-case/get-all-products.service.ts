import { Repository, MoreThan } from 'typeorm';
import { Product } from '../entity/product.entity';
import { InjectRepository, } from '@nestjs/typeorm';
export class GetAllProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async getAllproducts(): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                stock: MoreThan(0)
            }
        });
    }
}