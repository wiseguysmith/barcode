import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import type { CreateCreatorProfileDto } from "./dto/create-creator-profile.dto";

@Injectable()
export class CreatorProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCreatorProfile(dto: CreateCreatorProfileDto) {
    const existing = await this.prisma.creatorProfile.findUnique({
      where: { handle: dto.handle }
    });

    if (existing) throw new ConflictException("Creator handle is already taken");

    return this.prisma.creatorProfile.create({
      data: {
        userId: dto.userId,
        handle: dto.handle,
        name: dto.name,
        bio: dto.bio,
        status: "DRAFT",
        ...(dto.avatarUrl ? { avatarUrl: dto.avatarUrl } : {}),
        ...(dto.bannerUrl ? { bannerUrl: dto.bannerUrl } : {})
      }
    });
  }

  async submitForReview(creatorId: string) {
    return this.prisma.creatorProfile.update({
      where: { id: creatorId },
      data: { status: "PENDING" }
    });
  }

  async approveCreatorProfile(creatorId: string) {
    return this.prisma.creatorProfile.update({
      where: { id: creatorId },
      data: { status: "APPROVED" }
    });
  }

  async suspendCreatorProfile(creatorId: string) {
    return this.prisma.creatorProfile.update({
      where: { id: creatorId },
      data: { status: "SUSPENDED" }
    });
  }

  async attachStripeAccount(creatorId: string, stripeAccountId: string) {
    return this.prisma.creatorProfile.update({
      where: { id: creatorId },
      data: {
        stripeAccountId,
        stripeOnboardingStatus: "PENDING"
      }
    });
  }

  async updateStripeOnboardingStatus(
    stripeAccountId: string,
    stripeOnboardingStatus: "NOT_STARTED" | "PENDING" | "COMPLETE" | "RESTRICTED"
  ) {
    return this.prisma.creatorProfile.update({
      where: { stripeAccountId },
      data: { stripeOnboardingStatus }
    });
  }

  async getPublicCreatorPage(handle: string) {
    const creator = await this.prisma.creatorProfile.findFirst({
      where: { handle, status: "APPROVED" },
      include: {
        products: {
          where: { status: "PUBLISHED" },
          orderBy: { createdAt: "desc" }
        }
      }
    });

    if (!creator) throw new NotFoundException("Creator not found");
    return creator;
  }

  async getCreatorById(creatorId: string) {
    const creator = await this.prisma.creatorProfile.findUnique({
      where: { id: creatorId }
    });

    if (!creator) throw new NotFoundException("Creator not found");
    return creator;
  }

  async getCreatorByUserId(userId: string) {
    return this.prisma.creatorProfile.findUnique({
      where: { userId }
    });
  }
}
