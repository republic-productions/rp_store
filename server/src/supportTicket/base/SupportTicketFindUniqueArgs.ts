import { ArgsType, Field } from "@nestjs/graphql";
import { SupportTicketWhereUniqueInput } from "./SupportTicketWhereUniqueInput";

@ArgsType()
class SupportTicketFindUniqueArgs {
  @Field(() => SupportTicketWhereUniqueInput, { nullable: false })
  where!: SupportTicketWhereUniqueInput;
}

export { SupportTicketFindUniqueArgs };
