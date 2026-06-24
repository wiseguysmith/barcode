import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export class UploadProductFileDto {
  @ApiProperty()
  @IsString()
  productId!: string;

  @ApiProperty()
  @IsString()
  storageKey!: string;

  @ApiProperty()
  @IsString()
  filename!: string;

  @ApiProperty()
  @IsString()
  contentType!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  sizeBytes!: number;
}
