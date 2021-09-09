import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BusinessWhereInput } from "./BusinessWhereInput";
import { Type } from "class-transformer";
import { BusinessOrderByInput } from "./BusinessOrderByInput";

@ArgsType()
class BusinessFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => BusinessWhereInput,
  })
  @Field(() => BusinessWhereInput, { nullable: true })
  @Type(() => BusinessWhereInput)
  where?: BusinessWhereInput;

  @ApiProperty({
    required: false,
    type: BusinessOrderByInput,
  })
  @Field(() => BusinessOrderByInput, { nullable: true })
  @Type(() => BusinessOrderByInput)
  orderBy?: BusinessOrderByInput;

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

export { BusinessFindManyArgs };
