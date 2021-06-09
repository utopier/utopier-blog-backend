// import { Json } from 'aws-sdk/clients/robomaker';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity()
class Subscription extends BaseEntity {
  // Columns, Index
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ type: 'text', nullable: true })
  endpoint: string;

  @Column({ type: 'boolean', nullable: true })
  expirationTime: boolean;

// [TODO] : Subscription Push Message
//   @Column({ type: 'json', nullable: true })
//   keys: Json;

  // Relations
  @OneToOne((type) => User, (user) => user.subscription)
  user: User;

  // Custom Repository

  // Listeners and Subscribers
}

export default Subscription;
