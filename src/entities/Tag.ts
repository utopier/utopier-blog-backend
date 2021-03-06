import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  
  import Post from './Post';
  
  @Entity()
  class Tag extends BaseEntity {
    // Columns
    @PrimaryGeneratedColumn()
    id: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  
    @Column({ type: 'text', nullable: true })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    summary: string;
  
    // Relations
    @ManyToMany((type) => Post, (post) => post.tags)
    @JoinTable()
    posts: Post[];
  
    // Custom Repository
  
    // Listeners and Subscribers
  }
  
  export default Tag;
  