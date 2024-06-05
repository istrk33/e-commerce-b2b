import { IsString } from "class-validator";

export class UpdateOrderInvoiceAddressDto {
    @IsString()
    invoice_address: string;
}