import { ArgsType, Field } from "@nestjs/graphql";
import { StoreWhereUniqueInput } from "./StoreWhereUniqueInput";

@ArgsType()
class StoreFindUniqueArgs {
  @Field(() => StoreWhereUniqueInput, { nullable: false })
  where!: StoreWhereUniqueInput;
}

export { StoreFindUniqueArgs };
