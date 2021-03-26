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
  

export default router;