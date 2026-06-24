import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class PointsAdjustmentDto {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsInt()
  delta!: number;

  @ApiProperty()
  @IsString()
  reason!: string;

  @ApiProperty()
  @IsString()
  sourceId!: string;

  @ApiProperty()
  @IsString()
  createdBy!: string;
}
