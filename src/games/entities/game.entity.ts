import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Bet } from 'src/bets/entities/bet.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'games' })
@ObjectType()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  type: string;

  @Column()
  description: string;

  @Column({ unsigned: true })
  range: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ name: 'min_and_max_number', unsigned: true })
  minAndMaxNumber: number;

  @Column({ length: 20 })
  color: string;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @OneToMany(() => Bet, bet => bet.game)
  bets?: Bet[]
}
