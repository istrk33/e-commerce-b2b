import { IsArray, IsDecimal, IsInt, IsString } from "class-validator";

export class CreateOrderItemDto {
    @IsString()
    product: string;
    // @IsDecimal()
    // price: number;
    // @IsInt()
    // quantity: number;
}