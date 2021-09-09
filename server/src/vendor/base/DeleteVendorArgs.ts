import { ArgsType, Field } from "@nestjs/graphql";
import { VendorWhereUniqueInput } from "./VendorWhereUniqueInput";

@ArgsType()
class DeleteVendorArgs {
  @Field(() => VendorWhereUniqueInput, { nullable: false })
  where!: VendorWhereUniqueInput;
}

export { DeleteVendorArgs };
