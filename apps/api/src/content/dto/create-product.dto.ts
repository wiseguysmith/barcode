import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  creatorId!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(4000)
  description!: string;

  @ApiProperty()
  @IsInt()
  @Min(100)
  priceCents!: number;

  @ApiProperty({ default: "usd" })
  @IsString()
  currency = "usd";

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;
}
