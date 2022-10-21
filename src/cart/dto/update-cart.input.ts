import { InputType, Field, Float } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class UpdateCartInput {

  @IsPositive()
  @Field(() => Float)
  minCartValue?: number;

}
