import { Injectable } from "@nestjs/common";
import { resolveReferralSource } from "@barcode/shared";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../database/prisma.service";
import type { CreateReferralDto } from "./dto/create-referral.dto";
import type { TrackAttributionDto } from "./dto/track-attribution.dto";

@Injectable()
export class ReferralsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReferral(dto: CreateReferralDto) {
    const referralCode = randomUUID().slice(0, 8);
    const sourceType = resolveReferralSource({
      referralCode,
      ...(dto.referrerUserId ? { referrerUserId: dto.referrerUserId } : {}),
      ...(dto.creatorId ? { creatorId: dto.creatorId } : {})
    });

    return this.prisma.referral.create({
      data: {
        referralCode,
        sourceType,
        ...(dto.referrerUserId ? { referrerUserId: dto.referrerUserId } : {}),
        ...(dto.creatorId ? { creatorId: dto.creatorId } : {}),
        ...(dto.productId ? { productId: dto.productId } : {})
      }
    });
  }

  async resolveAttribution(dto: TrackAttributionDto) {
    const referral = dto.referralCode
      ? await this.prisma.referral.findUnique({
          where: { referralCode: dto.referralCode }
        })
      : null;
    const productId = dto.productId ?? referral?.productId ?? undefined;

    const sourceType = resolveReferralSource({
      ...(dto.referralCode ? { referralCode: dto.referralCode } : {}),
      ...(referral?.referrerUserId ? { referrerUserId: referral.referrerUserId } : {}),
      ...(referral?.creatorId ? { creatorId: referral.creatorId } : {})
    });

    return this.prisma.attribution.create({
      data: {
        referralId: referral?.id,
        visitorId: dto.visitorId,
        sourceType,
        landingUrl: dto.landingUrl,
        ...(productId ? { productId } : {}),
        ...(dto.referrerUrl ? { referrerUrl: dto.referrerUrl } : {})
      }
    });
  }
}
