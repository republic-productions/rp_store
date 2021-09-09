import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { StorefrontModule } from "./storefront/storefront.module";
import { AddressModule } from "./address/address.module";
import { ProductModule } from "./product/product.module";
import { ServiceModule } from "./service/service.module";
import { RoleModule } from "./role/role.module";
import { BusinessModule } from "./business/business.module";
import { OrganizationModule } from "./organization/organization.module";
import { CustomerModule } from "./customer/customer.module";
import { SupportTicketModule } from "./supportTicket/supportTicket.module";
import { PurchaseOrderModule } from "./purchaseOrder/purchaseOrder.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { VendorModule } from "./vendor/vendor.module";
import { SupplierModule } from "./supplier/supplier.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    StorefrontModule,
    AddressModule,
    ProductModule,
    ServiceModule,
    RoleModule,
    BusinessModule,
    OrganizationModule,
    CustomerModule,
    SupportTicketModule,
    PurchaseOrderModule,
    SubscriptionModule,
    VendorModule,
    SupplierModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
