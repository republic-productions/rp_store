import { ArgsType, Field } from "@nestjs/graphql";
import { VendorWhereUniqueInput } from "./VendorWhereUniqueInput";

@ArgsType()
class VendorFindUniqueArgs {
  @Field(() => VendorWhereUniqueInput, { nullable: false })
  where!: VendorWhereUniqueInput;
}

export { VendorFindUniqueArgs };
