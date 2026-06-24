import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { IdentityService } from "./identity.service";

@ApiTags("identity")
@Controller()
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post("auth/signup")
  createUser(@Body() dto: CreateUserDto) {
    return this.identityService.createUser(dto);
  }

  @Get("me")
  getMe(@Headers("x-user-id") userId: string) {
    return this.identityService.getUserById(userId);
  }
}
