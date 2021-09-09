import { ArgsType, Field } from "@nestjs/graphql";
import { BusinessWhereUniqueInput } from "./BusinessWhereUniqueInput";

@ArgsType()
class BusinessFindUniqueArgs {
  @Field(() => BusinessWhereUniqueInput, { nullable: false })
  where!: BusinessWhereUniqueInput;
}

export { BusinessFindUniqueArgs };
