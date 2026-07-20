import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import type { AppUserRole } from "./roles.guard";

export type SessionUserPayload = {
  userId: string;
  userRole: AppUserRole;
};

export const SessionUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();

  if (!req.session.userId || !req.session.userRole) {
    throw new UnauthorizedException("Sign in required");
  }

  return { userId: req.session.userId, userRole: req.session.userRole } satisfies SessionUserPayload;
});
