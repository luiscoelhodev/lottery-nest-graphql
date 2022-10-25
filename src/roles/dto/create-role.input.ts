import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsAlpha()
  type: string;

  @Field()
  @IsNotEmpty()
  description: string;
  
}
