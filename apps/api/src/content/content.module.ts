import { Module } from "@nestjs/common";
import { StorageModule } from "../storage/storage.module";
import { ContentAccessService } from "./content-access.service";
import { ContentController } from "./content.controller";
import { CreatorProfilesService } from "./creator-profiles.service";
import { ProductsService } from "./products.service";

@Module({
  imports: [StorageModule],
  controllers: [ContentController],
  providers: [CreatorProfilesService, ProductsService, ContentAccessService],
  exports: [CreatorProfilesService, ProductsService, ContentAccessService]
})
export class ContentModule {}
