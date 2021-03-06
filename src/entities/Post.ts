import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
    ManyToMany,
    OneToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
  } from 'typeorm';

  import User from './User';
  import Tag from './Tag';
  import Comment from './Comment';
  import Image from './Image';

@Entity()
class Post extends BaseEntity {
  // Columns    
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  // Relations
  // user, comments, images, tags, likers
  @ManyToOne((type) => User, (user) => user.posts, { onDelete: 'CASCADE' })
  author: User;

  @OneToMany((type) => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @OneToOne((type) => Image, (image) => image.postMainImg)
  @JoinColumn()
  mainImgUrl: Image;

  @ManyToMany((type) => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @ManyToMany((type) => User, (user) => user.likeposts)
  @JoinTable()
  likers: User[];

  // Custom Repository

  // Listeners and Subscribers
}

export default Post;