import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
  } from 'typeorm';
  
  import User from './User';
  import Post from './Post';
  
  @Entity()
  class Comment extends BaseEntity {
    // Columns
    @PrimaryGeneratedColumn()
    id: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  
    @Column({ type: 'text', nullable: true })
    content: string;
  
    // Relations
    @ManyToOne((type) => User, (user) => user.comments, { onDelete: 'CASCADE' })
    user: User;
  
    @ManyToOne((type) => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Post;
  
    // Custom Repository
  
    // Listeners and Subscribers
  }
  
  export default Comment;
  