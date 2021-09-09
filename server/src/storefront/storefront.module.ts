import { Module } from "@nestjs/common";
import { StorefrontModuleBase } from "./base/storefront.module.base";
import { StorefrontService } from "./storefront.service";
import { StorefrontController } from "./storefront.controller";
import { StorefrontResolver } from "./storefront.resolver";

@Module({
  imports: [StorefrontModuleBase],
  controllers: [StorefrontController],
  providers: [StorefrontService, StorefrontResolver],
  exports: [StorefrontService],
})
export class StorefrontModule {}
