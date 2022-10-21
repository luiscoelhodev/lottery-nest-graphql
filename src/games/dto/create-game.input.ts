import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty, IsPositive} from 'class-validator';

@InputType()
export class CreateGameInput {
  @IsAlphanumeric()
  @Field()
  type: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsPositive()
  @Field(() => Int)
  range: number;

  @IsPositive()
  @Field(() => Float)
  price: number

  @IsPositive()
  @Field(() => Int)
  minAndMaxNumber: number;

  @IsNotEmpty()
  @Field()
  color: string;
}
