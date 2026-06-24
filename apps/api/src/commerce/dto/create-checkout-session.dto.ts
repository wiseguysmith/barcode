import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateCheckoutSessionDto {
  @ApiProperty()
  @IsString()
  productId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  buyerUserId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  attributionId?: string;

  @ApiProperty()
  @IsString()
  successUrl!: string;

  @ApiProperty()
  @IsString()
  cancelUrl!: string;
}
