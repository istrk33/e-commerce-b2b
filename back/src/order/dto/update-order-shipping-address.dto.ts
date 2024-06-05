import { IsString } from "class-validator";

export class UpdateOrderShippingAddressDto {
    @IsString()
    shipping_address: string;
    @IsString()
    shipping_method: string;
}