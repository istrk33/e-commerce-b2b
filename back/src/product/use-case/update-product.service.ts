import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductUpdateDto } from '../dto/product-update.dto';
export class UpdateProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async updateProduct(id: number, data: ProductUpdateDto) {
        // on récupère l'product ciblé
        const product = await this.productRepository.findOneBy({ id });
        // on "merge" les données du body de la requête
        // avec les données déjà présentes dans l'product
        const productUpdate = { ...product, ...data };
        // on sauvegarde l'product mis à jour
        await this.productRepository.save(productUpdate);

        return productUpdate;
    }
}