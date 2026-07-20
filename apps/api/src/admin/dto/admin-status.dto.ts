import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreatorStatusDto {
  @ApiProperty({ enum: ["APPROVED", "SUSPENDED"] })
  @IsIn(["APPROVED", "SUSPENDED"])
  status!: "APPROVED" | "SUSPENDED";

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class ProductStatusDto {
  @ApiProperty({ enum: ["PUBLISHED", "HIDDEN", "SUSPENDED"] })
  @IsIn(["PUBLISHED", "HIDDEN", "SUSPENDED"])
  status!: "PUBLISHED" | "HIDDEN" | "SUSPENDED";

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class AdminPointsAdjustmentDto {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsInt()
  delta!: number;

  @ApiProperty()
  @IsString()
  reason!: string;
}
