import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsOptional } from 'class-validator';

@InputType()
export class UpdateRoleInput {
  @Field(() => Int)
  id: number;

  @Field({nullable: true})
  @IsOptional()
  @IsAlpha()
  type: string;

  @Field({nullable: true})
  @IsOptional()
  description: string;
}
