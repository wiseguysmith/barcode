import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateCreatorProfileDto {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @Matches(/^[a-z0-9-]{3,32}$/)
  handle!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  bio!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bannerUrl?: string;
}
