import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'roles' })
@ObjectType()
export class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: 'player', unique: true, length: 12 })
  type: string

  @Field()
  @Column()
  description: string

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date

  @Field(() => [User])
  @ManyToMany(() => User, user => user.roles)
  @JoinTable({
    name: 'users_roles', joinColumn: {
      name: 'role_id', referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id', referencedColumnName: 'id'
    }
  })
  users: User[];

}
