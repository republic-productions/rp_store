import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PurchaseOrderWhereInput } from "./PurchaseOrderWhereInput";
import { Type } from "class-transformer";
import { PurchaseOrderOrderByInput } from "./PurchaseOrderOrderByInput";

@ArgsType()
class PurchaseOrderFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PurchaseOrderWhereInput,
  })
  @Field(() => PurchaseOrderWhereInput, { nullable: true })
  @Type(() => PurchaseOrderWhereInput)
  where?: PurchaseOrderWhereInput;

  @ApiProperty({
    required: false,
    type: PurchaseOrderOrderByInput,
  })
  @Field(() => PurchaseOrderOrderByInput, { nullable: true })
  @Type(() => PurchaseOrderOrderByInput)
  orderBy?: PurchaseOrderOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { PurchaseOrderFindManyArgs };
