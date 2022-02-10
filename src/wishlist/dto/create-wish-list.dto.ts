import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWishListDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;
}
