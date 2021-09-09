import { Module } from "@nestjs/common";
import { StoreModuleBase } from "./base/store.module.base";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { StoreResolver } from "./store.resolver";

@Module({
  imports: [StoreModuleBase],
  controllers: [StoreController],
  providers: [StoreService, StoreResolver],
  exports: [StoreService],
})
export class StoreModule {}
