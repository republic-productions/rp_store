import { ArgsType, Field } from "@nestjs/graphql";
import { SupportTicketWhereUniqueInput } from "./SupportTicketWhereUniqueInput";

@ArgsType()
class DeleteSupportTicketArgs {
  @Field(() => SupportTicketWhereUniqueInput, { nullable: false })
  where!: SupportTicketWhereUniqueInput;
}

export { DeleteSupportTicketArgs };
