import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Bet } from 'src/bets/entities/bet.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'games' })
@ObjectType()
export class Game {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 30 })
  type: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Int)
  @Column({ unsigned: true })
  range: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Field(() => Int)
  @Column({ name: 'min_and_max_number', unsigned: true })
  minAndMaxNumber: number;

  @Field()
  @Column({ length: 20 })
  color: string;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @Field(() => [Bet], { nullable: true })
  @OneToMany(() => Bet, bet => bet.game)
  bets?: Bet[]
}
