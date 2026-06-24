import { Body, Controller, Delete, Get, Post, Req, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { Request } from "express";
import { Public } from "../common/auth.guard";
import { SessionUser } from "../common/session-user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { IdentityService } from "./identity.service";

@ApiTags("identity")
@Controller()
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Public()
  @Post("auth/signup")
  async signUp(@Body() dto: CreateUserDto, @Req() req: Request) {
    const user = await this.identityService.createUser(dto);
    req.session.userId = user.id;
    req.session.userRole = user.role as "USER" | "CREATOR" | "ADMIN";
    return user;
  }

  @Public()
  @Post("auth/signin")
  async signIn(@Body() dto: SignInDto, @Req() req: Request) {
    const result = await this.identityService.signIn(dto);
    req.session.userId = result.userId;
    req.session.userRole = result.role as "USER" | "CREATOR" | "ADMIN";
    return result;
  }

  @Delete("auth/session")
  signOut(@Req() req: Request) {
    return new Promise<{ ok: boolean }>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        else resolve({ ok: true });
      });
    });
  }

  @Get("me")
  getMe(@SessionUser() { userId }: { userId: string }) {
    if (!userId) throw new UnauthorizedException("Sign in required");
    return this.identityService.getUserById(userId);
  }
}
