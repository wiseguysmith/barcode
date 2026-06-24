import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateReferralDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  referrerUserId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  creatorId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  productId?: string;
}
