import { IsNumber, IsString } from "class-validator";

export class ProductUpdateDto {
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsNumber()
  stock: number;
  @IsString()
  description: string;
  @IsString()
  imageUrl: string;
  @IsString()
  color: string;
}
