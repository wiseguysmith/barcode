import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString } from "class-validator";

export class CreatorStatusDto {
  @ApiProperty({ enum: ["APPROVED", "SUSPENDED"] })
  @IsIn(["APPROVED", "SUSPENDED"])
  status!: "APPROVED" | "SUSPENDED";

  @ApiProperty()
  @IsString()
  adminUserId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class ProductStatusDto {
  @ApiProperty({ enum: ["PUBLISHED", "HIDDEN", "SUSPENDED"] })
  @IsIn(["PUBLISHED", "HIDDEN", "SUSPENDED"])
  status!: "PUBLISHED" | "HIDDEN" | "SUSPENDED";

  @ApiProperty()
  @IsString()
  adminUserId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}
