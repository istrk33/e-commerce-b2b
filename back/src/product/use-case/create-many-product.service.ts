import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateDto } from '../dto/product-create.dto';
import { Product } from '../entity/product.entity';
export class CreateManyProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async createManyProducts(data: ProductCreateDto[]) {
        try {
            const products = data.map(dto => this.productRepository.create(dto));

            // Sauvegarder les produits dans la base de données
            return await this.productRepository.save(products);
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating product');
        }
    }
}