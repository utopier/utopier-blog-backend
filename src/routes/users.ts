import express from 'express';
const router = express.Router();

import { Like } from 'typeorm';
import User from '../entities/User';

/**
 * @swagger
 * tags: [Users]
 * components:
 *   schemas:
 *   parameters:
 *   securitySchemes:
 *   requestBody:
 *   responses:
 *     userList:
 *       type: object
 *       properties:
 *         users:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 07224d6d-4c97-4360-ae58-65deea50350a
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2020-09-16T20:07:47.841Z
 *               email:
 *                 type: string
 *                 format: date-time
 *                 example: deploy@gmail.com
 *               nickname:
 *                 type: string
 *                 example: deploy
 *               avatar:
 *                 type: string
 *                 example: http://aws-s3-endpoint
 *               posts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 0ae52356-e36a-4886-ad2d-0ef4162a215d
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-27T05:05:06.508Z
 *                     updatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-27T05:05:06.508Z
 *                     title:
 *                       type: string
 *                       example: swagger
 *                     content:
 *                       type: string
 *                       example: blahhh.................
 *               followers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 5788803f-1cb6-4643-97ca-388361c3ac52
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-16T02:39:19.160Z
 *                     updatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-16T02:39:19.160Z
 *                     email:
 *                       type: string
 *                       example: deploy@gmail.com
 *                     nickname:
 *                       type: string
 *                       example: deploy
 *                     bio:
 *                       type: string
 *                       example: blahhh.......
 *               followings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 5788803f-1cb6-4643-97ca-388361c3ac52
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-16T02:39:19.160Z
 *                     updatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-16T02:39:19.160Z
 *                     email:
 *                       type: string
 *                       example: deploy@gmail.com
 *                     nickname:
 *                       type: string
 *                       example: deploy
 *                     bio:
 *                       type: string
 *                       example: blahhh.......
 *         usersCount:
 *           type: number
 *           example: 35
 *         filtering:
 *           type: boolean
 *           example: false
 *         skipNum:
 *           type: number
 *           example: 10
 *   headers:
 *   examples:
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get User List
 *     description: Get User List
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: User List
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/userList'
 */
 router.get('/', async (req: any, res, next) => {
    // GET /users
    try {
      let skipNum;
      if (parseInt(req.query.lastId, 10)) {
        skipNum = parseInt(req.query.lastId, 10);
      }
      console.log(req.query);
      const users = await User.findAndCount({
        select: ['id', 'nickname', 'email', 'createdDate'],
        relations: ['avatar', 'posts', 'followers', 'followings'],
        order: {
          createdDate: req.query.orderBy !== 0 ? req.query.orderBy : undefined,
          //followings: req.query.popular ? req.query.popular : undefined, // front에서 구현
        },
        skip: skipNum,
        take: 10,
      });
      let filtering =
        !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
      res
        .status(200)
        .json({ users: users[0], usersCount: users[1], filtering, skipNum });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  /**
   * @swagger
   * /users/search:
   *   get:
   *     summary: Get User List
   *     description: Get User List
   *     tags:
   *       - Users
   *     parameters:
   *       - in: query
   *         name: searchQuery
   *         schema:
   *           type: string
   *           example: deploy
   *       - in: query
   *         name: lastId
   *         schema:
   *           type: string
   *           example: 10
   *         description: skipNum
   *       - in: query
   *         name: orderBy
   *         schema:
   *           type: string
   *           example: ...
   *     responses:
   *       '200':
   *         description: User List
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/userList'
   */
  router.get('/search', async (req: any, res, next) => {
    // GET /users/search
    try {
      let skipNum;
      if (parseInt(req.query.lastId, 10)) {
        skipNum = parseInt(req.query.lastId, 10);
      }
      let userWhere = undefined;
      if (!!req.query.searchQuery) {
        userWhere = { nickname: Like(`%${req.query.searchQuery}%`) };
      }
      const users = !!req.query.searchQuery
        ? await User.findAndCount({
            select: ['id', 'nickname', 'email', 'createdDate'],
            relations: ['avatar', 'posts', 'followers', 'followings'],
            order: {
              createdDate:
                req.query.orderBy !== 0 ? req.query.orderBy : undefined,
              //followings: req.query.popular ? req.query.popular : undefined, // front에서 구현
            },
            where: { nickname: Like(`%${req.query.searchQuery}%`) },
            skip: skipNum,
            take: 10,
          })
        : await User.findAndCount({
            select: ['id', 'nickname', 'email', 'createdDate'],
            relations: ['avatar', 'posts', 'followers', 'followings'],
            order: {
              createdDate:
                req.query.orderBy !== 0 ? req.query.orderBy : undefined,
              //followings: req.query.popular ? req.query.popular : undefined, // front에서 구현
            },
            skip: skipNum,
            take: 10,
          });
      let filtering =
        !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
      res
        .status(200)
        .json({ users: users[0], searchedUsersCount: users[1], filtering });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  export default router;
  