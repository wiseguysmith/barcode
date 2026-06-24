import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../database/prisma.service";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { SignInDto } from "./dto/sign-in.dto";

const BCRYPT_ROUNDS = 12;

@Injectable()
export class IdentityService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const emailNormalized = dto.email.toLowerCase().trim();

    const existing = await this.prisma.authMethod.findUnique({
      where: { provider_providerUserId: { provider: "EMAIL", providerUserId: emailNormalized } }
    });

    if (existing) throw new ConflictException("Email is already registered");

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    return this.prisma.user.create({
      data: {
        displayName: dto.displayName,
        emailNormalized,
        authMethods: {
          create: {
            provider: "EMAIL",
            providerUserId: emailNormalized,
            email: emailNormalized,
            passwordHash
          }
        }
      },
      select: { id: true, displayName: true, emailNormalized: true, role: true, status: true, createdAt: true }
    });
  }

  async signIn(dto: SignInDto) {
    const emailNormalized = dto.email.toLowerCase().trim();

    const authMethod = await this.prisma.authMethod.findUnique({
      where: { provider_providerUserId: { provider: "EMAIL", providerUserId: emailNormalized } },
      include: { user: true }
    });

    if (!authMethod?.passwordHash) throw new UnauthorizedException("Invalid credentials");

    const valid = await bcrypt.compare(dto.password, authMethod.passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    if (authMethod.user.status === "SUSPENDED") {
      throw new UnauthorizedException("Account is suspended");
    }

    return {
      userId: authMethod.user.id,
      displayName: authMethod.user.displayName,
      role: authMethod.user.role,
      emailVerified: authMethod.verifiedAt !== null
    };
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        displayName: true,
        emailNormalized: true,
        role: true,
        status: true,
        createdAt: true,
        creatorProfile: true,
        authMethods: {
          select: { provider: true, email: true, verifiedAt: true, walletAddress: true }
        }
      }
    });

    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async attachWalletAuthMethod(userId: string, walletAddress: string) {
    await this.getUserById(userId);

    return this.prisma.authMethod.create({
      data: {
        userId,
        provider: "WALLET",
        providerUserId: walletAddress.toLowerCase(),
        walletAddress: walletAddress.toLowerCase()
      }
    });
  }

  async updateUserStatus(userId: string, status: "ACTIVE" | "SUSPENDED") {
    return this.prisma.user.update({ where: { id: userId }, data: { status } });
  }
}
