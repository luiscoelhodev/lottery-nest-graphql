import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlphanumeric, IsPositive, Matches } from 'class-validator';

@InputType()
export class CreateBetInput {

  @IsPositive()
  @Field(() => Int)
  userId: number;

  @IsAlphanumeric()
  @Field()
  gameType: string;

  @Matches(/(\d\d\,?\s?)+/)
  @Field()
  numbers: string;
}
