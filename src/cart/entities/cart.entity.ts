import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Cart {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'min_cart_value', unsigned: true })
  minCartValue: number;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
