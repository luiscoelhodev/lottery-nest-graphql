import { InputType, Field, Int} from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

@InputType()
export class UpdateUserInput {

  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsAlpha()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @Matches(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/, { message: `cpf must have 11 digits and can contain dots to separate every three digits and a dash to separate the last two, such as 111.222.333-44 or 11122233344.` })
  @Field({ nullable: true })
  cpf: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  password: string;
}
