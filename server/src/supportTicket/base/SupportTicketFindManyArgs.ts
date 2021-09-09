import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SupportTicketWhereInput } from "./SupportTicketWhereInput";
import { Type } from "class-transformer";
import { SupportTicketOrderByInput } from "./SupportTicketOrderByInput";

@ArgsType()
class SupportTicketFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SupportTicketWhereInput,
  })
  @Field(() => SupportTicketWhereInput, { nullable: true })
  @Type(() => SupportTicketWhereInput)
  where?: SupportTicketWhereInput;

  @ApiProperty({
    required: false,
    type: SupportTicketOrderByInput,
  })
  @Field(() => SupportTicketOrderByInput, { nullable: true })
  @Type(() => SupportTicketOrderByInput)
  orderBy?: SupportTicketOrderByInput;

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

export { SupportTicketFindManyArgs };
