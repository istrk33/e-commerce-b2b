import { IsArray, IsString } from "class-validator";
import { OrderItem } from "src/order-item/entity/order-item.entity";

export class AddOrderItemToOrderDto {
    @IsArray()
    items: OrderItem[];
}