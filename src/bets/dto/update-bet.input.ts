import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty, IsOptional, IsPositive, Matches } from 'class-validator';

@InputType()
export class UpdateBetInput {

  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @Matches(/(\d\d\,?\s?)+/)
  @Field({ nullable: true })
  numbers: string;

  // Implement logic in bets.service.ts in case the we want to be able to update the fields below:
  
  // @IsOptional()
  // @IsPositive()
  // @Field(() => Int, { nullable: true })
  // userId: number;

  // @IsOptional()
  // @IsAlphanumeric()
  // @Field({ nullable: true })
  // gameType: string;
}
