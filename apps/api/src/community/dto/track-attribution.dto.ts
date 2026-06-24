import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class TrackAttributionDto {
  @ApiProperty()
  @IsString()
  visitorId!: string;

  @ApiProperty()
  @IsUrl({ require_tld: false })
  landingUrl!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  referralCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl({ require_tld: false })
  referrerUrl?: string;
}
