import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { VendorWhereInput } from "./VendorWhereInput";
import { Type } from "class-transformer";
import { VendorOrderByInput } from "./VendorOrderByInput";

@ArgsType()
class VendorFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => VendorWhereInput,
  })
  @Field(() => VendorWhereInput, { nullable: true })
  @Type(() => VendorWhereInput)
  where?: VendorWhereInput;

  @ApiProperty({
    required: false,
    type: VendorOrderByInput,
  })
  @Field(() => VendorOrderByInput, { nullable: true })
  @Type(() => VendorOrderByInput)
  orderBy?: VendorOrderByInput;

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

export { VendorFindManyArgs };
