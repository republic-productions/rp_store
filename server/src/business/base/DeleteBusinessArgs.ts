import { ArgsType, Field } from "@nestjs/graphql";
import { BusinessWhereUniqueInput } from "./BusinessWhereUniqueInput";

@ArgsType()
class DeleteBusinessArgs {
  @Field(() => BusinessWhereUniqueInput, { nullable: false })
  where!: BusinessWhereUniqueInput;
}

export { DeleteBusinessArgs };
