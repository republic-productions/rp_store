import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StoreWhereInput } from "./StoreWhereInput";
import { Type } from "class-transformer";
import { StoreOrderByInput } from "./StoreOrderByInput";

@ArgsType()
class StoreFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => StoreWhereInput,
  })
  @Field(() => StoreWhereInput, { nullable: true })
  @Type(() => StoreWhereInput)
  where?: StoreWhereInput;

  @ApiProperty({
    required: false,
    type: StoreOrderByInput,
  })
  @Field(() => StoreOrderByInput, { nullable: true })
  @Type(() => StoreOrderByInput)
  orderBy?: StoreOrderByInput;

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

export { StoreFindManyArgs };
