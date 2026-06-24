import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const SessionUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return { userId: req.session.userId, userRole: req.session.userRole };
});
