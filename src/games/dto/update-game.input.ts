import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class UpdateGameInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsAlphanumeric()
  @Field({ nullable: true })
  type: string;

  @IsOptional()
  @Field({ nullable: true })
  description: string;

  @IsOptional()
  @IsPositive()
  @Field(() => Int, { nullable: true })
  range: number;

  @IsOptional()
  @IsPositive()
  @Field(() => Float, { nullable: true })
  price: number;

  @IsOptional()
  @IsPositive()
  @Field(() => Int, { nullable: true })
  minAndMaxNumber: number;

  @IsOptional()
  @Field({ nullable: true })
  color: string;
}
