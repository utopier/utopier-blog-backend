import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
  } from 'typeorm';
  
  import Post from './Post';
  import User from './User';
  
  @Entity()
  class Image extends BaseEntity {
    // Columns, Index
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column({ type: 'text', nullable: true })
    src: string;
  
    // Relations
    @OneToOne((type) => User, (user) => user.avatar)
    avatarUser: User;
    @OneToOne((type) => Post, (post) => post.mainImgUrl)
    postMainImg: Post;
    
    // Custom Repository
  
    // Listeners and Subscribers
  }
  
  export default Image;
  