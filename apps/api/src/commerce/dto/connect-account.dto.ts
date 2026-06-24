import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateConnectAccountDto {
  @ApiProperty()
  @IsString()
  creatorId!: string;

  @ApiProperty()
  @IsString()
  email!: string;
}

export class CreateConnectAccountLinkDto {
  @ApiProperty()
  @IsString()
  creatorId!: string;

  @ApiProperty()
  @IsString()
  refreshUrl!: string;

  @ApiProperty()
  @IsString()
  returnUrl!: string;
}
