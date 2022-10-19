import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, CreateDateColumn, DataSourceOptions, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Bet } from 'src/bets/entities/bet.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'secure_id', generated: 'uuid', type: 'uuid' })
  secureId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }

  @OneToMany(() => Bet, bet => bet.user)
  bets?: Bet[]
}
