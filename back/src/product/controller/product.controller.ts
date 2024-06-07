import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProductService } from '../use-case/create-product.service';
import { DeleteProductService } from '../use-case/delete-product.service';
import { GetAllProductsService } from '../use-case/get-all-products.service';
import { GetOneProductByIdService } from '../use-case/get-one-product-by-id.service';
import { UpdateProductService } from '../use-case/update-product.service';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { CreateManyProductsService } from '../use-case/create-many-product.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly createManyProductsService: CreateManyProductsService,
    private readonly deleteProductService: DeleteProductService,
    private readonly getAllProductsService: GetAllProductsService,
    private readonly getOneProductByIdService: GetOneProductByIdService,
    private readonly updateProductService: UpdateProductService,
  ) { }

  @Get()
  getAllProducts() {
    return this.getAllProductsService.getAllproducts();
  }

  @Get(':id')
  getOneProductById(@Param('id', ParseIntPipe) id: number) {
    return this.getOneProductByIdService.getOneProductById(id);
  }

  @Post()
  createProduct(@Body() data: ProductCreateDto) {
    return this.createProductService.createProduct(data);
  }

  @Post('/many')
  createManyProducts(@Body() data: ProductCreateDto[]) {
    return this.createManyProductsService.createManyProducts(data);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ProductUpdateDto,
  ) {
    return this.updateProductService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.deleteProductService.deleteProduct(id);
  }
}
