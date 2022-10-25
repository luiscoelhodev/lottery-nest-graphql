import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsPositive } from "class-validator";

@InputType()
export class UpdatePermissionInput {
  @IsPositive()
  @Field(() => Int)
  id: number;

  @IsIn(['admin', 'player'], { each: true })
  @Field(() => [String])
  roles: string[];
}