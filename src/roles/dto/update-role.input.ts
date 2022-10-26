import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateRoleInput {
  @IsNotEmpty()
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
