import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UploadProductFileDto } from "./dto/upload-product-file.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        creatorId: dto.creatorId,
        title: dto.title,
        description: dto.description,
        priceCents: dto.priceCents,
        currency: dto.currency,
        status: "DRAFT",
        ...(dto.coverImageUrl ? { coverImageUrl: dto.coverImageUrl } : {})
      }
    });
  }

  async addProductFile(dto: UploadProductFileDto) {
    return this.prisma.productFile.create({
      data: {
        productId: dto.productId,
        storageKey: dto.storageKey,
        filename: dto.filename,
        contentType: dto.contentType,
        sizeBytes: dto.sizeBytes
      }
    });
  }

  async publishProduct(productId: string) {
    const fileCount = await this.prisma.productFile.count({ where: { productId } });
    if (fileCount === 0) {
      throw new BadRequestException("At least one product file is required");
    }

    return this.prisma.product.update({
      where: { id: productId },
      data: { status: "PUBLISHED" }
    });
  }

  async moderateProduct(productId: string, status: "PUBLISHED" | "HIDDEN" | "SUSPENDED") {
    return this.prisma.product.update({
      where: { id: productId },
      data: { status }
    });
  }

  async getProductForCheckout(productId: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        status: "PUBLISHED",
        creator: {
          status: "APPROVED",
          stripeOnboardingStatus: "COMPLETE"
        }
      },
      include: { creator: true }
    });

    if (!product) throw new NotFoundException("Product is not available for checkout");
    return product;
  }

  async getProductFiles(productId: string) {
    return this.prisma.productFile.findMany({
      where: { productId },
      orderBy: { createdAt: "asc" }
    });
  }
}
