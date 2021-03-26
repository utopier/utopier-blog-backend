import express, {Request, Response, NextFunction } from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import passport from 'passport';

import { isLoggedIn, isNotLoggedIn } from '../utils/middlewares';

import User from '../entities/User'

/**
 * @swagger
 * tags: [User]
 * security:
 *   - ApiKeyAuth: []
 * components:
 *   schemas:
 *   parameters:
 *     cookie:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *   requestBody:
 *     newUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: unique data
 *           example: example@example.com
 *         nickname:
 *           type: string
 *           example: example
 *         password:
 *           type: string
 *           example: '12341234'
 *     loginUserData:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: unique data
 *           example: example@example.com
 *         password:
 *           type: string
 *           example: '12341234'
 *   responses:
 *     badRequest:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: bad request
 *           example: error
 *         message:
 *           type: string
 *           description: error message
 *           example: error blahhhhh...
 *     conflict:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: bad request
 *           example: error
 *         message:
 *           type: string
 *           description: error message
 *           example: 이미 사용중인 email 입니다.
 *     userDataWithoutPassword:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: db16d68a-47c5-4362-8535-02ad9d2f5806
 *         email:
 *           type: string
 *           example: example@gmail.com
 *         nickname:
 *           type: string
 *           example: example
 *     isLoggedIn:
 *       type: string
 *       example: 로그인이 필요합니다
 *     userFollowing:
 *       type: object
 *       properties: 
 *         id:
 *           type: string
 *           example: db16d68a-47c5-4362-8535-02ad9d2f5806
 *         createdDate:
 *           type: string
 *           format: date-time
 *           example: 2020-12-09T09:53:01.135Z
 *         updatedDate:
 *           type: string
 *           format: date-time
 *           example: 2020-12-09T09:53:01.135Z
 *         email:
 *           type: string
 *           example: deploy2@gmail.com
 *         nickname:
 *           type: string
 *           example: deploy2
 *         bio:    
 *           type: string
 *           example: bio blahhhhhh...........
 *     userData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: db16d68a-47c5-4362-8535-02ad9d2f5806
 *         email:
 *           type: string
 *           example: deploy2@gmail.com
 *         nickname:
 *           type: string
 *           example: deploy2
 *         posts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 0ae52356-e36a-4886-ad2d-0ef4162a215d
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2020-09-27T05:05:06.508Z
 *               updatedDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2020-09-27T05:05:06.508Z
 *               title:
 *                 type: string
 *                 example: swagger
 *               content:
 *                 type: string
 *                 example: blahh...........
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
 *                     content:
 *                       type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                     name:
 *                       type: string
 *                       example: swagger
 *                     summary:
 *                       type: string
 *                       example: blahh....
 *               likers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 07224d6d-4c97-4360-ae58-65deea50350a
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-16T20:07:47.841Z
 *                     updatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2020-09-16T20:07:47.841Z
 *                     email:
 *                       type: string
 *                       example: test10@gmail.com
 *                     nickname:
 *                       type: string
 *                       example: test10
 *                     bio:
 *                       type: string
 *                       example: blahh........
 *               author:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 07224d6d-4c97-4360-ae58-65deea50350a
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2020-09-16T20:07:47.841Z
 *                   updatedDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2020-09-16T20:07:47.841Z
 *                   email:
 *                     type: string
 *                     example: deploy@gmail.com
 *                   nickname:
 *                     type: string
 *                     example: deploy
 *                   bio:
 *                     type: string
 *                     example: blah......
 *               mainImgUrl:
 *                 type: object
 *                 properties:
 *                   src:
 *                     type: string
 *                     example: http://aws-s3-endpoint
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               content:
 *                 type: string
 *         likeposts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *         followings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *         followers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *   headers:
 *     returnCookie:
 *       Set-Cookie:
 *         schema:
 *           type: string
 *         description: sessionId
 *       ETag:
 *         schema:
 *           type: string
 *         description: Cookie 식별자
 *       Date:
 *         schema:
 *           type: string
 *           format: date-time
 *         description: expires 하루 GMT 시간 
 *   example:
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Sign Up
 *     subscription: User Sign Up
 *     tags: 
 *       - User
 *     requestBody:
 *       description: New User Data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBody/newUser'
 *     responses:
 *       '201':
 *         description: Create NewUser
 *         headers:
 *           $ref: '#/components/headers/returnCookie'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Success
 *                   example: success
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/badRequest'
 *       '409':
 *         description: Existing User, Coflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/conflict'
 */
 router.post(
    '/',
    isNotLoggedIn,
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      // POST /user
      try {
        console.log('user signup router req : ', req.body);
        // SELECT * FROM user WHERE email = 'test@test.com'
        const exUser = await User.findOne({
          where: { email: req.body.email },
        });
        if (exUser) {
          return res.status(409).json({status:'error',message:'이미 사용 중인 아이디입니다.'});
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        // INSERT INTO 'user' ('email','nickname','password') VALUES ('test@test.com','testnick','12341234aA!');
        // id는 typeorm  @PrimaryGeneratedColumn('uuid')로 생성해서 넣음.
        // password는 bcrypt로 hash화해서 넣음.
       await User.insert({
          email: req.body.email,
          nickname: req.body.nickname,
          password: hashedPassword,
        });
        res.status(201).json({status: 'success'});
      } catch (error) {
        res.status(400).json({status: 'error', message:error})
        console.error(error);
        next(error);
      }
    }
  );
  
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: user login
 *     description: 유저 로그인
 *     tags:
 *       - User
 *     requestBody:
 *       description: user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBody/loginUserData'
 *     responses:
 *       '200':
 *         description: userData without password 
 *         headers:
 *           $ref: '#/components/headers/returnCookie'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/userDataWithoutPassword'
 *       '401':
 *         description: unauthorized
 *       '500':
 *         description: internal server error
 */
 router.post('/login', isNotLoggedIn, async (req, res, next) => {
    // POST /user/login
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(500).json(info.message);
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        // SELECT id, email, nickname FROM user WHERE id = 'db16d68a-47c5-4362-8535-02ad9d2f5806'
        const fullUserWithoutPassword = await User.getRepository().findOne({
          where: { id: user.id },
          select: ['id', 'email', 'nickname'],
        });
        return res.status(200).json(fullUserWithoutPassword);
      });
    })(req, res, next);
  });
  
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: logout
 *     description: delete req.user & session destory
 *     tags:
 *       - User
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *     responses:
 *       '200':
 *         description: Logout User Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Success
 *                   example: success
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 */
 router.post('/logout', isLoggedIn, (req: any, res: Response) => {
    // req.user 객체 제거
    req.logout();
    // session 객체 내용 제거
    req.session.destroy();
    // res.redirect('/');
    res.status(200).json({
      status:'success'
    });
  });

export default router;