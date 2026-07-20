import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";

export type AppUserRole = "USER" | "CREATOR" | "ADMIN";

export const ROLES_KEY = "roles";
export const Roles = (...roles: AppUserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AppUserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles?.length) return true;

    const req = context.switchToHttp().getRequest<Request>();

    if (!req.session.userId) {
      throw new UnauthorizedException("Sign in required");
    }

    if (!req.session.userRole || !requiredRoles.includes(req.session.userRole)) {
      throw new ForbiddenException("Insufficient role");
    }

    return true;
  }
}
