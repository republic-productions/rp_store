import { ArgsType, Field } from "@nestjs/graphql";
import { StorefrontWhereUniqueInput } from "./StorefrontWhereUniqueInput";

@ArgsType()
class StorefrontFindUniqueArgs {
  @Field(() => StorefrontWhereUniqueInput, { nullable: false })
  where!: StorefrontWhereUniqueInput;
}

export { StorefrontFindUniqueArgs };
