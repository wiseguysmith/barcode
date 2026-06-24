import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => Reflect.metadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();

    if (!req.session.userId) {
      throw new UnauthorizedException("Sign in required");
    }

    return true;
  }
}
