import { InputType, Field, Float } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class CreateCartInput {
  
  @IsPositive()
  @Field(() => Float)
  minCartValue: number;

}
