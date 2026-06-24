import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import { CommerceModule } from "./commerce/commerce.module";
import { CommunityModule } from "./community/community.module";
import { ContentModule } from "./content/content.module";
import { DatabaseModule } from "./database/database.module";
import { IdentityModule } from "./identity/identity.module";
import { JobsModule } from "./jobs/jobs.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    StorageModule,
    IdentityModule,
    ContentModule,
    CommerceModule,
    CommunityModule,
    AdminModule,
    JobsModule
  ]
})
export class AppModule {}
