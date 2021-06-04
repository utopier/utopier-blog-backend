import express, { Response, NextFunction } from 'express';
const router = express.Router();

import { Like } from 'typeorm';
import Post from '../entities/Post';
import Tag from '../entities/Tag';

/**
 * @swagger
 * tags: [Posts]
 * components:
 *   schemas:
 *   parameters:
 *   securitySchemes:
 *   requestBodies:
 *   responses:
 *     postList:
 *       type: object
 *       properties:
 *         posts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 01fadf30-8c51-4e87-8eaa-710da9ff50a0
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2020-09-23T22:29:23.609Z
 *               updatedDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2020-09-23T22:29:23.609Z
 *               title:
 *                 type: string
 *                 example: swagger
 *               content:
 *                 type: string
 *                 example: # hello react editor world!\n## h2\n**bolg**\n*italic*\n ~~strike~~\n* * *\n> blockquoteddd
 *               mainImgUrl:
 *                 type: object
 *                 properties:
 *                   src:
 *                     type: string
 *               author:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 8a82a258-9fa8-416b-b916-f7909d866af2
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2020-09-23T21:35:30.456Z
 *                   updatedDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2020-09-24T03:48:11.000Z
 *                   email:
 *                     type: string
 *                     example: deploy@gmail.com
 *                   nickname:
 *                     type: string
 *                     example: UpdateNick
 *                   bio:
 *                     type: string
 *                     example: bio blahh.....
 *                   avatar:
 *                     type: string
 *               comments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                     updatedDate:
 *                       type: string
 *                       format: date-time
 *                     content:
 *                       type: string
 *               tags:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 190ae4a5-aaf6-4172-9dec-cf3f3343bae9
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-23T22:29:23.679Z
 *                     updatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-23T22:29:23.679Z
 *                     name:
 *                       type: string
 *                       example: nextjs
 *                     summary:
 *                       type: string
 *                       example: blahh.........
 *               likers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 8a82a258-9fa8-416b-b916-f7909d866af2
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-23T21:35:30.456Z
 *                     updatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-24T03:48:11.000Z
 *                     email:
 *                       type: string
 *                       example: deploy@gmail.com
 *                     nickname:
 *                       type: string
 *                       example: deploy
 *                     bio:
 *                       type: string
 *                       example: bio blahhhh..............
 *         postCount:
 *           type: number
 *           example: 36 
 *         filtering:
 *           type: boolean
 *           example: false
 *         skipNum:
 *           type: number
 *           example: 10
 *     postListWithTag:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             example: 01fadf30-8c51-4e87-8eaa-710da9ff50a0
 *           createdDate:
 *             type: string
 *             format: date-time
 *             example: 2020-09-23T22:29:23.609Z
 *           updatedDate:
 *             type: string
 *             format: date-time
 *             example: 2020-09-23T22:29:23.609Z
 *           title:
 *             type: string
 *             example: swagger
 *           content:
 *             type: string
 *             example: blahh..........
 *   headers:
 *   examples:
 */


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get Post List
 *     description: Get post List
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: Post List
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/postList'
 */
router.get(
  '/',
  async (req: any, res: Response, next: NextFunction): Promise<any> => {
    // GET /posts
    try {
      console.log("req.query.lastId : ",req.query.lastId)
      console.log("req.query.orderBy : ", req.query.orderBy)
      console.log("req.query.popular : ", req.query.popular)
      console.log("req.query.searchQuery : ",req.query.searchQuery)
      let skipNum;
      if (parseInt(req.query.lastId, 10)) {
        skipNum = parseInt(req.query.lastId, 10);
      }
      console.log("skipNum : ", skipNum);
      const posts = await Post.findAndCount({
        relations: [
          'mainImgUrl',
          'author',
          'author.avatar',
          'comments',
          'tags',
          'likers',
        ],
        order: {
          createdDate: req.query.orderBy !== 0 ? req.query.orderBy : undefined,
          likers: req.query.popular !== 0 ? req.query.popular : undefined,
        },
        skip: skipNum,
        take: 10,
      });
      let filtering =
        !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
      console.log('filtering : ', filtering);
        res
        .status(200)
        .json({ posts: posts[0], postsCount: posts[1], filtering, skipNum });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);


/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Get Post Searched List
 *     description: Get Post Searched List
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: Post List
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/postList'
 */
router.get(
  '/search',
  async (req: any, res: Response, next: NextFunction): Promise<any> => {
    // GET /posts
    try {
      let skipNum;
      let postWhere;
      if (parseInt(req.query.lastId, 10)) {
        skipNum = parseInt(req.query.lastId, 10);
      }
      if (!!req.query.searchQuery) {
        postWhere = [
          { title: Like(`%${req.query.searchQuery}%`) },
          { content: Like(`%${req.query.searchQuery}%`) },
        ];
      }
      const posts = await Post.findAndCount({
        relations: ['mainImgUrl', 'author', 'comments', 'tags', 'likers'],
        order: {
          createdDate: req.query.orderBy !== 0 ? req.query.orderBy : undefined,
          //likers: req.query.popular !== 0 ? req.query.popular : undefined,
        },
        where: postWhere || undefined,
        skip: skipNum,
        take: 10,
      });
      let filtering =
        !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;

      res
        .status(200)
        .json({ posts: posts[0], searchedPostsCount: posts[1], filtering });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

/**
 * @swagger
 * /posts/{tagId}:
 *   get:
 *     summary: Get Post List
 *     description: Get post List
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: tagId
 *         schema:
 *           type: string
 *           example: 190ae4a5-aaf6-4172-9dec-cf3f3343bae9
 *     responses:
 *       '200':
 *         description: Post List
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/postListWithTag'
 */
router.get(
  '/:tagId',
  async (req: any, res: Response, next: NextFunction): Promise<any> => {
    // GET /posts/{tagId}
    try {
      const tag: any = await Tag.findOne({
        where: { id: req.params.tagId },
      });
      console.log(tag);
      if (!tag) {
        res.status(403).send('태그가 존재하지 않습니다.');
      }
      const posts = await Tag.createQueryBuilder()
        .relation(Tag, 'posts')
        .of(tag.id)
        .loadMany();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
