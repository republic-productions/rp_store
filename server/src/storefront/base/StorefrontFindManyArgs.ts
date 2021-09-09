import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StorefrontWhereInput } from "./StorefrontWhereInput";
import { Type } from "class-transformer";
import { StorefrontOrderByInput } from "./StorefrontOrderByInput";

@ArgsType()
class StorefrontFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => StorefrontWhereInput,
  })
  @Field(() => StorefrontWhereInput, { nullable: true })
  @Type(() => StorefrontWhereInput)
  where?: StorefrontWhereInput;

  @ApiProperty({
    required: false,
    type: StorefrontOrderByInput,
  })
  @Field(() => StorefrontOrderByInput, { nullable: true })
  @Type(() => StorefrontOrderByInput)
  orderBy?: StorefrontOrderByInput;

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

export { StorefrontFindManyArgs };
