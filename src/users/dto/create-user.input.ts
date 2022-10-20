import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  cpf: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
