import { Body, Controller, Get, Param, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../common/auth.guard";
import { SessionUser } from "../common/session-user.decorator";
import { ContentAccessService } from "./content-access.service";
import { CreatorProfilesService } from "./creator-profiles.service";
import { CreateCreatorProfileDto } from "./dto/create-creator-profile.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { UploadProductFileDto } from "./dto/upload-product-file.dto";
import { ProductsService } from "./products.service";

@ApiTags("content")
@Controller()
export class ContentController {
  constructor(
    private readonly creatorProfilesService: CreatorProfilesService,
    private readonly productsService: ProductsService,
    private readonly contentAccessService: ContentAccessService
  ) {}

  @Post("creators/profile")
  createCreatorProfile(@Body() dto: CreateCreatorProfileDto) {
    return this.creatorProfilesService.createCreatorProfile(dto);
  }

  @Post("creators/:creatorId/submit-review")
  submitCreatorForReview(@Param("creatorId") creatorId: string) {
    return this.creatorProfilesService.submitForReview(creatorId);
  }

  @Public()
  @Get("creators/:handle/public")
  getPublicCreatorPage(@Param("handle") handle: string) {
    return this.creatorProfilesService.getPublicCreatorPage(handle);
  }

  @Post("products")
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Post("products/:productId/files")
  addProductFile(@Param("productId") productId: string, @Body() dto: UploadProductFileDto) {
    return this.productsService.addProductFile({ ...dto, productId });
  }

  @Post("products/:productId/publish")
  publishProduct(@Param("productId") productId: string) {
    return this.productsService.publishProduct(productId);
  }

  @Get("products/:productId")
  getProduct(@Param("productId") productId: string) {
    return this.productsService.getProduct(productId);
  }

  @Get("creators/:creatorId/products")
  getCreatorProducts(@Param("creatorId") creatorId: string) {
    return this.productsService.getCreatorProducts(creatorId);
  }

  @Get("creators/me/profile")
  getMyCreatorProfile(@SessionUser() { userId }: { userId: string }) {
    return this.creatorProfilesService.getCreatorByUserId(userId);
  }

  @Get("creators/me/products")
  async getMyProducts(@SessionUser() { userId }: { userId: string }) {
    const creator = await this.creatorProfilesService.getCreatorByUserId(userId);
    if (!creator) throw new NotFoundException("Creator profile not found");
    return this.productsService.getCreatorProducts(creator.id);
  }

  @Post("products/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadProductWithFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
    @SessionUser() { userId }: { userId: string }
  ) {
    return this.productsService.createProductWithFile(userId, file, dto);
  }

  @Get("products/:productId/download-url")
  createSignedDownloadUrl(
    @SessionUser() { userId }: { userId: string },
    @Param("productId") productId: string
  ) {
    return this.contentAccessService.createSignedDownloadUrls(userId, productId);
  }
}
