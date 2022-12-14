import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Bet } from 'src/bets/entities/bet.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'secure_id', generated: 'uuid', type: 'uuid' })
  secureId: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  cpf: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ name: 'role_types' })
  roleTypes: string


  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }

  @Field(() => [Bet], { nullable: true })
  @OneToMany(() => Bet, bet => bet.user)
  bets?: Bet[]

  @Field(() => [Role])
  @ManyToMany(() => Role, role => role.users)
  roles: Role[]
}
