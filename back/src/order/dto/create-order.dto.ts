import { IsArray } from "class-validator";
import { OrderItem } from "src/order-item/entity/order-item.entity";

export class CreateOrderDto {
    @IsArray()
    items: OrderItem[];
}