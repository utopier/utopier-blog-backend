import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { isLoggedIn } from '../utils/middlewares';

import User from '../entities/User';
import Post from '../entities/Post';
import Image from '../entities/Image';
import Comment from '../entities/Comment';
import Tag from '../entities/Tag';

import path from 'path';
import fs from 'fs';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

try {
    fs.accessSync('uploads');
  } catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
  }
  
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });
  
  export const upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'utopier-blog-dev-storage',
      key(req, file, cb) {
        console.log(req);
        console.log('multer : ',file);
        cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  });
  
  export const s3 = new AWS.S3();
  
  
/**
 * @swagger
 * tags: [Post]
 * components:
 *   schemas:
 *   parameters:
 *   securitySchemes:
 *   requestBody:
 *     newPost:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Post Title 
 *           example: title1
 *         content:
 *           type: string
 *           description: Post Content
 *           example: post content blahhh...................
 *         mainImgUrl:
 *           type: string
 *           description: Post Main Image Url
 *           example: http://aws-s3-endpoint
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             example:
 *               - swagger
 *               - postman
 *   responses:
 *     postData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: newPost Id
 *           example: 10c23bc2-1910-4a46-9b1c-a9bfde1701ea
 *         createdDate:
 *           type: string
 *           example: 2020-12-10T02:56:11.526Z
 *         updatedDate:
 *           type: string
 *           example: 2020-12-10T02:56:11.000Z
 *         title:
 *           type: string
 *           description: newPost Title
 *           example: title1
 *         content:
 *           type: string
 *           description: newPost Content
 *           example: content blahh......
 *         author: 
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: fab71182-ee85-4d37-a671-c7e582b32258
 *             createdDate:
 *               type: string
 *               format: date-time
 *               example: 2020-12-09T07:38:50.685Z
 *             updatedDate:
 *               type: string
 *               format: date-time
 *               example: 2020-12-09T09:34:53.000Z
 *             email:
 *               type: string
 *               example: deploy@gmail.com
 *             nickname:
 *               type: string
 *               example: deploy
 *             bio:
 *               type: string
 *               example: newBio
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: 1
 *         mainImgUrl:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 2663790a-350b-4b46-9d51-dc2ae274bec7
 *             src:
 *               type: string
 *               example: https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: d2ba3708-7f29-46b3-b72e-533443cdf610
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2020-12-10T02:56:11.574Z
 *               updatedDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2020-12-10T02:56:11.574Z
 *               name:
 *                 type: string
 *                 example: postman
 *               summary:
 *                 type: string
 *                 example: summary blah.....
 *         likers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 1 
 *     commentData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: dec35a5f-fb1f-49cf-8c95-9a669816963c
 *         createdDate:
 *           type: string
 *           format: date-time
 *           example: 2020-12-10T05:13:12.707Z
 *         updatedDate:
 *           type: string
 *           format: date-time
 *           example: 2020-12-10T05:13:12.000Z
 *         content:
 *           type: string
 *           example: create comment test
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: fab71182-ee85-4d37-a671-c7e582b32258
 *             createdDate:
 *               type: string
 *               format: date-time
 *               example: 2020-12-09T07:38:50.685Z
 *             updatedDate:
 *               type: string
 *               format: date-time
 *               example: 2020-12-09T09:34:53.000Z
 *             email:
 *               type: string
 *               example: deploy@gmail.com
 *             nickname:
 *               type: string
 *               example: newNickname
 *             bio:
 *               type: string
 *               example: newBio
 *         post:  
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: b7191cd9-cc54-4251-863a-17269355223f
 *             createdDate:
 *               type: string
 *               format: date-time
 *               example: 2020-12-10T05:06:17.969Z
 *             updatedDate:
 *               type: string
 *               format: date-time
 *               example: 2020-12-10T05:06:18.000Z
 *             title:
 *               type: string
 *               example: title test
 *             content:
 *               type: string
 *               example: content test blahhh........
 *   headers:
 *   examples:
 */

/**
 * @swagger
 * /post:
 *   post:
 *     summray: Create Post 
 *     description: Create New Post 
 *     tags:
 *       - Post
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *     requestBody:
 *       description: New Post
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBody/newPost'
 *     responses:
 *       '200':
 *         description: NewPost Create Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/postData'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 */
 router.post(
    '/',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // POST /post
      try {
        const post: any = await Post.insert({
          author: req.user.id,
          title: req.body.title,
          content: req.body.content,
        });
        if (Array.isArray(req.body.tags)) {
          console.log('req.body.tag : ', req.body.tags);
          await Promise.all(
            req.body.tags.map(async (tagName: string) => {
              const extTag = await Tag.findOne({
                name: tagName,
              });
              if (extTag) {
                await Post.createQueryBuilder()
                  .relation(Post, 'tags')
                  .of(post.identifiers[0].id)
                  .add(extTag.id);
              } else {
                const newTag: any = await Tag.insert({
                  name: tagName,
                });
                console.log(newTag);
                const newPost = await Post.createQueryBuilder()
                  .relation(Post, 'tags')
                  .of(post.identifiers[0].id)
                  .add(newTag.identifiers[0].id);
              }
            })
          );
        } else {
          const extTag = await Tag.findOne({
            name: req.body.tags,
          });
          if (extTag) {
            await Post.createQueryBuilder()
              .relation(Post, 'tags')
              .of(post.identifiers[0].id)
              .add(extTag.id);
          } else {
            const newTag: any = await Tag.insert({
              name: req.body.tags,
            });
            await Post.createQueryBuilder()
              .relation(Post, 'tags')
              .of(post.identifiers[0].id)
              .add(newTag.identifiers[0].id);
          }
        }
        if (req.body.mainImgUrl) {
          const image: any = await Image.insert({ src: req.body.mainImgUrl });
          console.log(image);
          const test = await Post.createQueryBuilder()
            .relation(Post, 'mainImgUrl')
            .of(post.identifiers[0].id)
            .set(image.identifiers[0].id);
          console.log(test);
        }
  
        // const me = await User.find({
        //   where: { id: req.user.id },
        //   relations: ['followers', 'followers.subscription'],
        // });
  
        // const subscriptionUsers = me[0].followers.filter((user: any): any => {
        //   return user.subscription !== null;
        // });
  
        // console.log(subscriptionUsers);
        // if (subscriptionUsers) {
        //   subscriptionUsers.map(async (user) => {
        //     const pushSubscription = {
        //       endpoint: user.subscription.endpoint,
        //       keys: JSON.parse(user.subscription.keys),
        //     };
        //     const payload = 'new post message';
        //     const options = {
        //       vapidDetails: {
        //         subject: 'mailto:utopier2025@gmail.com',
        //         publicKey: vapidKeys.publicKey,
        //         privateKey: vapidKeys.privateKey,
        //       },
        //     };
  
        //     webpush
        //       .sendNotification(pushSubscription, payload, options)
        //       .catch((err) => {
        //         if (err.statusCode === 404 || err.statusCode === 410) {
        //           console.log(
        //             'Subscription has expired or is no longer valid: ',
        //             err
        //           );
        //         } else {
        //           throw err;
        //         }
        //       });
        //   });
        // }
  
        const fullPost = await Post.getRepository().findOne({
          where: { id: post.identifiers[0].id },
          relations: ['author', 'comments', 'mainImgUrl', 'tags', 'likers'],
        });
        res.status(201).json(fullPost);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  router.post(
    '/images',
    isLoggedIn,
    upload.array('image'),
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // POST /post/images
      console.log('req.files', req.files);
      res.json(req.files[0].location);
    }
  );
  
  router.delete(
    '/images',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // DELETE /post/image
      s3.deleteObject(
        {
          Bucket: 'utopier-test-s3', // 사용자 버켓 이름
          Key: req.query.imgPath, // 버켓 내 경로
        },
        (err, data) => {
          if (err) {
            throw err;
          }
          console.log('s3 deleteObject ', data);
        }
      );
      // console.log(path.join(__dirname, '..', '/', req.query.imgPath));
      // fs.unlink(path.join(__dirname, '..', req.query.imgPath), function (err) {
      //   if (err) throw err;
  
      //   console.log('file deleted');
      // });
      res.json(req.body.imgPath);
    }
  );
  

/**
 * @swagger
 * /post/{postId}:
 *   get:
 *     summary: Get Post Data
 *     description: Get post Data
 *     tags:
 *       - Post
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *           example: 10c23bc2-1910-4a46-9b1c-a9bfde1701ea
 *     requestBody:
 *       description: Update Post Data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBody/newPost'
 *     responses:
 *       '200':
 *         description: Post Data Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/postData'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 존재하지 않는 게시글
 */
 router.get(
    '/:postId',
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // GET /post/{postId}
      console.log('req.params: ', req.params);
      try {
        const post = await Post.findOne({
          where: { id: req.params.postId },
        });
        if (!post) {
          return res.status(404).send('존재하지 않는 게시글');
        }
        const fullPost = await Post.getRepository().findOne({
          where: { id: post.id },
          relations: [
            'author',
            'comments',
            'comments.user',
            'tags',
            'mainImgUrl',
            'likers',
          ],
        });
        res.status(200).json(fullPost);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  /**
   * @swagger
   * /post/{postId}:
   *   patch:
   *     summary: Update Post Data
   *     description: Update post Data
   *     tags:
   *       - Post
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *       - in: path
   *         name: postId
   *         schema:
   *           type: string
   *           example: 10c23bc2-1910-4a46-9b1c-a9bfde1701ea
   *     responses:
   *       '200':
   *         description: Post Data Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/postData'
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   *       '404':
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: 존재하지 않는 게시글
   */
  router.patch('/:postId', isLoggedIn, async (req, res, next) => {
    // PATCH /post/{postId}
    try {
      let newPost;
      newPost = await Post.update(
        {
          id: req.params.postId,
        },
        {
          title: req.body.title,
          content: req.body.content,
        }
      );
      console.log('newPost : ', newPost);
      if (Array.isArray(req.body.tags)) {
        await Promise.all(
          req.body.tags.map(async (tagName: string) => {
            const extTag = await Tag.findOne({
              name: tagName,
            });
            if (extTag) {
              await Post.createQueryBuilder()
                .relation(Post, 'tags')
                .of(req.params.postId)
                .add(extTag.id);
            } else {
              const newTag: any = await Tag.insert({
                name: tagName,
              });
              console.log(newTag);
              newPost = await Post.createQueryBuilder()
                .relation(Post, 'tags')
                .of(req.params.postId)
                .add(newTag.identifiers[0].id);
            }
          })
        );
      } else {
        const extTag = await Tag.findOne({
          name: req.body.tags,
        });
        if (extTag) {
          await Post.createQueryBuilder()
            .relation(Post, 'tags')
            .of(req.params.postId)
            .add(extTag.id);
        } else {
          const newTag: any = await Tag.insert({
            name: req.body.tags,
          });
          newPost = await Post.createQueryBuilder()
            .relation(Post, 'tags')
            .of(req.params.postId)
            .add(newTag.identifiers[0].id);
        }
      }
      if (req.body.mainImgUrl) {
        const image: any = await Image.insert({ src: req.body.mainImgUrl });
        console.log('prev img update : ', newPost)
        newPost = await Post.createQueryBuilder()
          .relation(Post, 'mainImgUrl')
          .of(req.params.postId)
          .set(image.identifiers[0].id);
        console.log('img update : ', newPost)
      }
      res.status(200).json({
        postId: req.params.postId,
        newPost,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  /**
   * @swagger
   * /post/{postId}:
   *   delete:
   *     summary: Delete Post
   *     description: Delte Post 
   *     tags:
   *       - Post
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *       - in: path
   *         name: postId
   *         schema:
   *           type: string
   *           example: 10c23bc2-1910-4a46-9b1c-a9bfde1701ea
   *     responses:
   *       '200':
   *         description: Delete Post Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 postId:
   *                   type: string
   *                   description: deleted Post
   *                   example: 10c23bc2-1910-4a46-9b1c-a9bfde1701ea
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   *       '404':
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: postId에 일치하는 포스트가 없음
   */
  router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    // DELETE /post/{postId}
    try {
      const deletedPost = await Post.delete({
        id: req.params.postId,
      });
      if(deletedPost.affected){
        res.status(200).json({ postId: req.params.postId });
      } else {
        res.status(404).send('postId에 일치하는 포스트가 없음')
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  

/**
 * @swagger
 * /post/{postId}/comment:
 *   post:
 *     summary: Create Post Comment
 *     description: Create Post Comment
 *     tags:
 *       - Post
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *           example: 10c23bc2-1910-4a46-9b1c-a9bfde1701ea
 *     requestBody:
 *       description: Update Post Comment
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: create comment test
 *     responses:
 *       '201':
 *         description: Create Post Comment Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/commentData'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 *       '403':
 *         description: Not exiting
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 존재하지 않는 게시글
 */
 router.post(
    '/:postId/comment',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // POST /post/{postId}/comment
      try {
        const post = await Post.findOne({
          where: { id: req.params.postId },
        });
        if (!post) {
          return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.insert({
          content: req.body.content,
        });
        await User.createQueryBuilder()
          .relation(User, 'comments')
          .of(req.user.id)
          .add(comment.identifiers[0].id);
        await Post.createQueryBuilder()
          .relation(Post, 'comments')
          .of(post.id)
          .add(comment.identifiers[0].id);
  
        const fullComment = await Comment.getRepository().findOne({
          where: { id: comment.identifiers[0].id },
          relations: ['user', 'post'],
        });
        res.status(201).json(fullComment);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  
  /**
   * @swagger
   * /post/{postId}/comment/{commentId}:
   *   post:
   *     summary: Create Post Comment
   *     description: Create Post Comment
   *     tags:
   *       - Post
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *       - in: path
   *         name: postId
   *         schema:
   *           type: string
   *           example: 10c23bc2-1910-4a46-9b1c-a9bfde1701ea
   *       - in: path
   *         name: commentId
   *         schema: 
   *           type: string
   *           example: dec35a5f-fb1f-49cf-8c95-9a669816963c
   *     requestBody:
   *       description: Update Post Comment
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               content:
   *                 type: string
   *                 example: update comment test
   *     responses:
   *       '201':
   *         description: Update Post Comment Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   example: dec35a5f-fb1f-49cf-8c95-9a669816963c 
   *                 content:
   *                   type: string
   *                   example: update comment test
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   *       '403':
   *         description: Not exiting
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: 존재하지 않는 게시글
   */
  router.patch(
    '/:postId/comment/:commentId',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // PATCH /post/{postId}/comment/:commentId
      try {
        await Comment.update(
          { id: req.params.commentId },
          {
            content: req.body.content,
          }
        );
        res
          .status(200)
          .json({ id: req.params.commentId, content: req.body.content });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  /**
   * @swagger
   * /post/{postId}/comment/{commentId}:
   *   delete:
   *     summary: Delete Post Comment
   *     description: Delete Post Comment
   *     tags:
   *       - Post
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *       - in: path
   *         name: postId
   *         schema:
   *           type: string
   *           example: 10c23bc2-1910-4a46-9b1c-a9bfde1701ea
   *       - in: path
   *         name: commentId
   *         schema: 
   *           type: string
   *           example: dec35a5f-fb1f-49cf-8c95-9a669816963c
   *     responses:
   *       '200':
   *         description: Update Post Comment Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 postId:
   *                   type: string
   *                   example: b7191cd9-cc54-4251-863a-17269355223f 
   *                 commentId:
   *                   type: string
   *                   example: dec35a5f-fb1f-49cf-8c95-9a669816963c
   *                 userId:
   *                   type: string
   *                   example: fab71182-ee85-4d37-a671-c7e582b32258
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   *       '403':
   *         description: Not exiting
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: 존재하지 않는 댓글
   */
  router.delete(
    '/:postId/comment/:commentId',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // DELETE /post/{postId}/comment/:commentId
      try {
        const comment = await Comment.findOne({
          where: { id: req.params.commentId, user: { id: req.user.id } },
        });
        if (!comment) {
          return res.status(403).send('존재하지 않는 댓글');
        }
        await Comment.createQueryBuilder()
          .relation(Comment, 'post')
          .of(comment.id)
          .set(null);
        await Comment.delete({ id: comment.id });
        res.status(200).json({
          postId: req.params.postId,
          commentId: req.params.commentId,
          userId: req.user.id,
        });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

/**
 * @swagger
 * /post/{postId}/like:
 *   patch:
 *     summary: Create Post Like
 *     description: Create Post Like
 *     tags:
 *       - Post
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *           example: b7191cd9-cc54-4251-863a-17269355223f
 *     responses:
 *       '201':
 *         description: Create Post Like Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   example: b7191cd9-cc54-4251-863a-17269355223f 
 *                 userId:
 *                   type: string
 *                   example: fab71182-ee85-4d37-a671-c7e582b32258
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 *       '403':
 *         description: Not exiting
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 존재하지 않는 게시글
 */
 router.patch(
    '/:postId/like',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // GET /post/{postId}/like
      try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
          return res.status(403).send('존재하지 않는 게시글');
        }
        await Post.createQueryBuilder()
          .relation(Post, 'likers')
          .of(post.id)
          .add(req.user.id);
        res.status(201).json({ postId: req.params.postId, userId: req.user.id });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  /**
   * @swagger
   * /post/{postId}/like:
   *   delete:
   *     summary: Delete Post Like
   *     description: Delete Post Like
   *     tags:
   *       - Post
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *       - in: path
   *         name: postId
   *         schema:
   *           type: string
   *           example: b7191cd9-cc54-4251-863a-17269355223f
   *     responses:
   *       '200':
   *         description: Delete Post Like Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 postId:
   *                   type: string
   *                   example: b7191cd9-cc54-4251-863a-17269355223f 
   *                 userId:
   *                   type: string
   *                   example: fab71182-ee85-4d37-a671-c7e582b32258
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   *       '403':
   *         description: Not exiting
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: 존재하지 않는 게시글
   */
  router.delete(
    '/:postId/like',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // DELETE /post/{postId}/like
      try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
          return res.status(403).send('존재하지 않는 게시글');
        }
        await Post.createQueryBuilder()
          .relation(Post, 'likers')
          .of(post.id)
          .remove(req.user.id);
        res.json({ postId: req.params.postId, userId: req.user.id });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  

export default router;