import express from 'express';
const router = express.Router();

import { Like } from 'typeorm';
import Tag from '../entities/Tag';

/**
 * @swagger
 * tags: [Tags]
 * components:
 *   schemas:
 *   parameters:
 *   securitySchemes:
 *   requestBodies:
 *   responses:
 *     tagList:
 *       type: object
 *       properties:
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 190ae4a5-aaf6-4172-9dec-cf3f3343bae9
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2020-09-23T22:29:23.679Z
 *               name:
 *                 type: string
 *                 example: swagger
 *               posts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 01fadf30-8c51-4e87-8eaa-710da9ff50a0
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-23T22:29:23.609Z
 *                     updatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-23T22:29:23.609Z
 *                     title:
 *                       type: string
 *                       example: swagger
 *                     content:
 *                       type: string
 *                       example: blahhhh................
 *         tagCount:
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
 * /tags:
 *   get:
 *     summary: Get Tag List
 *     description: Get Tag List
 *     tags:
 *       - Tags
 *     responses:
 *       '200':
 *         description: Tag List
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/tagList'
 */
router.get('/', async (req: any, res, next) => {
  // GET /tags
  try {
    let skipNum;
    if (parseInt(req.query.lastId, 10)) {
      skipNum = parseInt(req.query.lastId, 10);
    }
    const tags = await Tag.findAndCount({
      select: ['id', 'name', 'createdDate'],
      relations: ['posts'],
      order: {
        createdDate: req.query.orderBy !== 0 ? req.query.orderBy : undefined,
        // posts: req.query.popular ? req.query.popular : undefined, Front에서 구현
      },

      skip: skipNum,
      take: 10,
    });
    let filtering =
      !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
    console.log(filtering);
    res
      .status(200)
      .json({ tags: tags[0], tagsCount: tags[1], filtering, skipNum });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * @swagger
 * /tags/search:
 *   get:
 *     summary: Get Tag List
 *     description: Get Tag List
 *     tags:
 *       - Tags
 *     responses:
 *       '200':
 *         description: Tag List
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/tagList'
 */
router.get('/search', async (req: any, res, next) => {
  // GET /tags
  try {
    let skipNum;
    if (parseInt(req.query.lastId, 10)) {
      skipNum = parseInt(req.query.lastId, 10);
    }
    let tagWhere;
    if (!!req.query.searchQuery) {
      tagWhere = { name: Like(`%${req.query.searchQuery}%`) };
    }
    const tags = await Tag.findAndCount({
      select: ['id', 'name', 'createdDate'],
      relations: ['posts'],
      order: {
        createdDate: req.query.orderBy !== 0 ? req.query.orderBy : undefined,
        // posts: req.query.popular ? req.query.popular : undefined, Front에서 구현
      },
      where: tagWhere || undefined,
      skip: skipNum,
      take: 10,
    });
    let filtering =
      !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
    console.log(filtering);
    res
      .status(200)
      .json({ tags: tags[0], searchedTagsCount: tags[1], filtering, skipNum });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
