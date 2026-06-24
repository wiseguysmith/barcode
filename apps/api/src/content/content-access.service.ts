import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { canAccessPaidContent } from "@barcode/shared";
import { PrismaService } from "../database/prisma.service";
import { StorageService } from "../storage/storage.service";
import { ProductsService } from "./products.service";

@Injectable()
export class ContentAccessService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    private readonly storageService: StorageService
  ) {}

  async createSignedDownloadUrls(userId: string, productId: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        buyerUserId: userId,
        productId,
        status: "PAID"
      },
      orderBy: { paidAt: "desc" }
    });

    if (!order) throw new ForbiddenException("Paid order required");

    const allowed = canAccessPaidContent({
      orderBuyerUserId: order.buyerUserId,
      requesterUserId: userId,
      orderProductId: order.productId,
      requestedProductId: productId,
      orderStatus: order.status
    });

    if (!allowed) throw new ForbiddenException("Paid order required");

    const files = await this.productsService.getProductFiles(productId);
    if (files.length === 0) throw new NotFoundException("No files available");

    return Promise.all(
      files.map(async (file) => ({
        filename: file.filename,
        contentType: file.contentType,
        sizeBytes: file.sizeBytes,
        url: await this.storageService.createSignedReadUrl({
          storageKey: file.storageKey,
          expiresInSeconds: 300
        })
      }))
    );
  }
}
