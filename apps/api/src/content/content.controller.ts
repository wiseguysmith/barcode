import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateCreatorProfileDto } from "./dto/create-creator-profile.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { UploadProductFileDto } from "./dto/upload-product-file.dto";
import { ContentAccessService } from "./content-access.service";
import { CreatorProfilesService } from "./creator-profiles.service";
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

  @Get("products/:productId/download-url")
  createSignedDownloadUrl(
    @Headers("x-user-id") userId: string,
    @Param("productId") productId: string
  ) {
    return this.contentAccessService.createSignedDownloadUrls(userId, productId);
  }
}
