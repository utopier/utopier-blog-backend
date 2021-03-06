import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    JoinColumn,
  } from 'typeorm';
  
  import Post from './Post';
  import Comment from './Comment';
  import Image from './Image';
  import Subscription from './Subscription';
  
  @Entity()
  class User extends BaseEntity {
    // Columns
    @PrimaryGeneratedColumn()
    id: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  
    @Column({ type: 'text', nullable: true })
    email: string;
  
    @Column({ type: 'text', nullable: true })
    password: string;
  
    @Column({ type: 'text', nullable: true })
    nickname: string;
  
    @Column({ type: 'text', nullable: true })
    bio: string;
  
    // Relations
    // posts, comments, like, follwers, followings]
    @OneToOne((type) => Subscription, (subscription) => subscription.user)
    @JoinColumn()
    subscription: Subscription;

    @OneToOne((type) => Image, (image) => image.avatarUser)
    @JoinColumn()
    avatar: Image;
    
    @OneToMany((type) => Post, (post) => post.author, { cascade: true })
    posts: Post[];
  
    @OneToMany((type) => Comment, (comment) => comment.user, { cascade: true })
    comments: Comment[];
  
    @ManyToMany((type) => Post, (post) => post.likers)
    likeposts: Post[];
  
    @ManyToMany((type) => User, (user) => user.followings)
    @JoinTable()
    followers: User[];
  
    @ManyToMany((type) => User, (user) => user.followers)
    followings: User[];
  
    // Custom Repository
    // comparePassword
  
    // Listeners and Subscribers
    // savePassword
  }
  
  export default User;
  