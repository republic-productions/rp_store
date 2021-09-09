import { ArgsType, Field } from "@nestjs/graphql";
import { StorefrontWhereUniqueInput } from "./StorefrontWhereUniqueInput";

@ArgsType()
class DeleteStorefrontArgs {
  @Field(() => StorefrontWhereUniqueInput, { nullable: false })
  where!: StorefrontWhereUniqueInput;
}

export { DeleteStorefrontArgs };
