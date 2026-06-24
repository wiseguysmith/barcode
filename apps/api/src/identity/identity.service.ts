import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import type { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class IdentityService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const emailNormalized = dto.email.toLowerCase().trim();
    const existing = await this.prisma.authMethod.findUnique({
      where: {
        provider_providerUserId: {
          provider: "EMAIL",
          providerUserId: emailNormalized
        }
      }
    });

    if (existing) {
      throw new ConflictException("Email is already registered");
    }

    return this.prisma.user.create({
      data: {
        displayName: dto.displayName,
        emailNormalized,
        authMethods: {
          create: {
            provider: "EMAIL",
            providerUserId: emailNormalized,
            email: emailNormalized,
            verifiedAt: new Date()
          }
        }
      },
      include: { authMethods: true }
    });
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { authMethods: true, creatorProfile: true }
    });

    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async getUserByAuthMethod(provider: "EMAIL" | "WALLET", providerUserId: string) {
    return this.prisma.authMethod.findUnique({
      where: { provider_providerUserId: { provider, providerUserId } },
      include: { user: true }
    });
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
    return this.prisma.user.update({
      where: { id: userId },
      data: { status }
    });
  }
}
