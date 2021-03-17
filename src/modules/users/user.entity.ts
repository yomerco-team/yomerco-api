import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { UserType } from '../user-types/user-type.entity';

@Entity({ name: 'users' })
@Unique('uk_users_email', ['email'])
@Unique('uk_users_authUid', ['authUid'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  fullName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  authUid?: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  imageUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations
  @ApiProperty({ type: () => UserType })
  @ManyToOne(() => UserType, userType => userType.users)
  @JoinColumn({ name: 'user_type_id' })
  userType: UserType;
}
