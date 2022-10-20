import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class CreateUserInput {

  @IsAlpha()
  @Field()
  name: string;

  @Matches(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/, { message: `cpf must have 11 digits and can contain dots to separate every three digits and a dash to separate the last two, such as 111.222.333-44 or 11122233344.` })
  @Field()
  cpf: string;

  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
