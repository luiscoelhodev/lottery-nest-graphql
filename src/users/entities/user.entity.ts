import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, CreateDateColumn, DataSourceOptions, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
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
}
