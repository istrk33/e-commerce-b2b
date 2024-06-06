import { IsArray, IsDecimal, IsInt, IsNumber, IsString } from "class-validator";
import { Order } from "src/order/entity/order.entity";
import { Product } from "src/product/entity/product.entity";

export class CreateOrderItemDto {
    @IsNumber()
    quantity: number;
    @IsNumber()
    productId: number;
}