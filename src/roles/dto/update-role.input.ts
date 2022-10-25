import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional } from 'class-validator';

@InputType()
export class UpdateRoleInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsOptional()
  @IsAlpha()
  type: string;

  @Field()
  @IsOptional()
  description: string;
}
