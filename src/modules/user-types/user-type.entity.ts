import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../users/user.entity';

@Entity({ name: 'user_types' })
export class UserType {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 5 })
  code: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations
  @ApiProperty({ type: () => [User] })
  @OneToMany(() => User, user => user.userType)
  users: User[];
}
