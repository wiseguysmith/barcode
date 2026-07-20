import { ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { describe, expect, it } from "vitest";
import { type AppUserRole, RolesGuard } from "../src/common/roles.guard";

function makeGuard(requiredRoles: AppUserRole[] | undefined) {
  return new RolesGuard({
    getAllAndOverride: () => requiredRoles
  } as unknown as Reflector);
}

function makeContext(session: Record<string, unknown>) {
  return {
    getHandler: () => undefined,
    getClass: () => undefined,
    switchToHttp: () => ({
      getRequest: () => ({ session })
    })
  } as unknown as ExecutionContext;
}

describe("RolesGuard", () => {
  it("allows routes without role requirements", () => {
    expect(makeGuard(undefined).canActivate(makeContext({}))).toBe(true);
  });

  it("allows a session with the required role", () => {
    expect(
      makeGuard(["ADMIN"]).canActivate(
        makeContext({
          userId: "user_1",
          userRole: "ADMIN"
        })
      )
    ).toBe(true);
  });

  it("rejects unauthenticated sessions for role-protected routes", () => {
    expect(() => makeGuard(["ADMIN"]).canActivate(makeContext({}))).toThrow(
      UnauthorizedException
    );
  });

  it("rejects signed-in users without the required role", () => {
    expect(() =>
      makeGuard(["ADMIN"]).canActivate(
        makeContext({
          userId: "user_1",
          userRole: "CREATOR"
        })
      )
    ).toThrow(ForbiddenException);
  });
});
