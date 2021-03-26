import express, {Request, Response, NextFunction } from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import passport from 'passport';

import { isLoggedIn, isNotLoggedIn } from '../utils/middlewares';
import { upload, s3 } from './post';

import User from '../entities/User';
import Image from '../entities/Image';


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

  /**
 * @swagger
 * /user:
 *   get:
 *     summary: Get Me Data
 *     description: Get me User Data for init Redux Store
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
 *               $ref: '#/components/responses/userDataWithoutPassword'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 */
router.get(
  '/',
  isLoggedIn,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    // GET /user
    try {
      if (req.user) {
        // SELECT * FROM user WHERER id = "req.user.id"
        // LEFT JOIN, ON
        const fullUserWithoutPassword = await User.getRepository().findOne({
          where: { id: req.user.id},
          select: ['id', 'email', 'nickname', 'bio'],
          relations: [
            'avatar',
            'posts',
            'posts.comments',
            'posts.tags',
            'posts.likers',
            'posts.author',
            'posts.mainImgUrl',
            'comments',
            'likeposts',
            'followings',
            'followers',
          ],
        });
        res.status(200).json(fullUserWithoutPassword);
      } else {
        res.status(200).json(null);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

/**
 * @swagger
 * /user/nickname:
 *   patch:
 *     summary: Update User Nickname
 *     description: Update User Nickname
 *     tags:
 *       - User
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *     requestBody:
 *       description: New Nickname
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: newNickname
 *     responses:
 *       '200':
 *         description: Nickname Update Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nickname:
 *                   type: string
 *                   example: newNickname
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 */

 router.patch(
    '/nickname',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // PATCH /user/nickname
      try {
        // UPDATE user SET nickname = 'sqlupdate', updatedDate = CURRENT_TIMESTAMP WHERE id = 'db16d68a-47c5-4362-8535-02ad9d2f5806'
        await User.update(
          { id: req.user.id },
          {
            nickname: req.body.nickname,
          }
        );
        res.status(200).json({ nickname: req.body.nickname });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  /**
   * @swagger
   * /user/bio:
   *   patch:
   *     summary: Update User bio
   *     description: Update User bio
   *     tags:
   *       - User
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *     requestBody:
   *       description: New Bio
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               bio:
   *                 type: string
   *                 example: newBio
   *     responses:
   *       '200':
   *         description: Bio Update Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 bio:
   *                   type: string
   *                   example: newBio
   *       '400':
   *         description: Bad Request
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   */
  router.patch(
    '/bio',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // PATCH /user/bio
      try {
        // UPDATE user SET bio = 'sqlupdate', updatedDate = CURRENT_TIMESTAMP WHERE id = 'db16d68a-47c5-4362-8535-02ad9d2f5806'
        await User.update(
          { id: req.user.id },
          {
            bio: req.body.bio,
          }
        );
        res.status(200).json({ bio: req.body.bio });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

/**
 * @swagger
 * /user/images:
 *   post:
 *     summary: Update User Avatar
 *     description: Update User Avatar, multer s3 upload
 *     tags:
 *       - User
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *     requestBody:
 *       description: User Avatar Image
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Avatar Update Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarUrl:
 *                   type: string
 *                   example: aws s3 endpoint
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 */
 router.post(
    '/images',
    isLoggedIn,
    upload.array('image'),
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
        console.log('images post router req : ', req.files[0])
      // POST /user/images
      // INSERT INTO image (id, src) VALUES ('ahewuohoi13', 'https://.../.../..')
      const image: any = await Image.insert({ src: req.files[0].location });
      // UPDATE user SET avatarId = 'imageId', updatedDate = CURRENT_TIMESTAMP WHERE id IN 'userId'
      await User.createQueryBuilder()
        .relation(User, 'avatar')
        .of(req.user.id)
        .set(image.identifiers[0].id);
      res.status(201).json(req.files[0].location);
    }
  );
  
  /**
   * @swagger
   * /user/images:
   *   delete:
   *     summary: Delete User Avatar
   *     description: Delete User Avatar
   *     tags:
   *       - User
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *       - in: query
   *         name: imgPath
   *         schema:
   *           type: string
   *           example: http://aws-s3-endpoint
   *     responses:
   *       '200':
   *         description: Avatar Delete Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 avatarUrl:
   *                   type: string
   *                   example: newBio
   *       '400':
   *         description: Bad Request
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   */
  router.delete(
    '/images',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // DELETE /post/image
      s3.deleteObject(
        {
          Bucket: 'utopier-blog-dev-storage', // 사용자 버켓 이름
          Key: req.query.imgPath, // 버켓 내 경로
        },
        (err, data) => {
          if (err) {
            throw err;
          }
        }
      );
      // DELETE FROM image from WHERE src = 'req.params.imgPath'
      await Image.delete({ src: req.params.imgPath });
      // UPDATE user SET avatarId = null, updatedDate = CURRENT_TIMESRAMP WHERE id IN 'userId'
      await User.createQueryBuilder()
        .relation(User, 'avatar')
        .of(req.user.id)
        .set(null);
      res.json(req.body.imgPath);
    }
  );
  
/**
 * @swagger
 * /user/{userId}/follow:
 *   patch:
 *     summary: User Follow
 *     description: User Follow
 *     tags:
 *       - User
 *     parameters:
 *       - in: cookie
 *         name: sessionId
 *         schema:
 *           type: string
 *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           example: 6e38a79f-26ee-4f71-bed8-dca9c22cd908
 *         required: true
 *         description: follow userId
 *     responses:
 *       '201':
 *         description: Unfollow Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 6e38a79f-26ee-4f71-bed8-dca9c22cd908
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLoggedIn'
 *       '403':
 *         description: No Existing User
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 없는 사람입니다
 */
 router.patch(
    '/:userId/follow',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction) => {
      // PATCH /user/{userId}/follow
      // https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md
      try {
        const user: any = await User.find({
          where: { id: +req.params.userId },
        });
        if (!user) {
          res.status(403).send('없는 사람입니다');
        }
        const me: any = await User.findOne({ where: { id: req.user.id } });
        console.log(`req.params.userId : ${req.params.userId}`);
        // INSERT INTO user_followers_user (userId_1, userId_2) VALUES ('req.params.userId', 'req.user.id')
        await User.createQueryBuilder()
          .relation(User, 'followings')
          .of(me.id)
          .add(+req.params.userId);
        res.status(201).json({ userId: req.params.userId });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  /**
   * @swagger
   * /user/{userId}/follow:
   *   delete:
   *     summary: User Unfollow
   *     description: User Unfollow
   *     tags:
   *       - User
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *           example: 6e38a79f-26ee-4f71-bed8-dca9c22cd908
   *         required: true
   *         description: unfollow userId
   *     responses:
   *       '201':
   *         description: Unfollow Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userId:
   *                   type: string
   *                   example: 6e38a79f-26ee-4f71-bed8-dca9c22cd908
   *       '400':
   *         description: Bad Request
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   *       '403':
   *         description: No Existing User
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: 없는 사람입니다
   */
  router.delete(
    '/:userId/follow',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // DELETE /user/{userId}/follow
      try {
        const user: any = await User.findOne({
          where: { id: +req.params.userId },
        });
        if (!user) {
          res.status(403).json('없는 사람입니다');
        }
        const me: any = await User.findOne({ where: { id: req.user.id } });
        // INSERT INTO user_followers_user (userId_1, userId_2) VALUES ('req.params.userId', 'req.user.id')
        await User.createQueryBuilder()
          .relation(User, 'followings')
          .of(me.id)
          .remove(+req.params.userId);
        res.status(201).json({ userId: req.params.userId });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  
  
  /**
   * @swagger
   * /user/follower/{userId}:
   *   delete:
   *     summary: Delete User Follower
   *     description: Delete User Follower
   *     tags:
   *       - User
   *     parameters:
   *       - in: cookie
   *         name: sessionId
   *         schema:
   *           type: string
   *           example: sessionId=s%3AlXJNnVqS6yHMY-fgSoENMRf0V_zuNlfw.rtMVSGM7sISgHo
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *           example: fab71182-ee85-4d37-a671-c7e582b32258
   *     responses:
   *       '200':
   *         description: Deleted FollowUser
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userId:
   *                   type: string
   *                   example: fab71182-ee85-4d37-a671-c7e582b32258
   *                   description: 삭제한 유저 ID
   *       '400':
   *         description: Bad Request
   *       '401':
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/isLoggedIn'
   *       '403':
   *         description: No Existing User
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: 존재하지 않는 유저
   */
  router.delete(
    '/follower/:userId',
    isLoggedIn,
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      // DELETE /user/follower/{userId}
      try {
        const user: any = await User.findOne({
          where: { id: +req.params.userId },
        });
        if (!user) {
          res.status(403).send('존재하지 않는 유저');
        }
        const me: any = await User.findOne({ where: { id: req.user.id } });
        // DELETE FROM user_followers_user WHERE userId_1 = 'req.user.id' AND userId_2 = 'req.params.userId
        await User.createQueryBuilder()
          .relation(User, 'followers')
          .of(me.id)
          .remove(+req.params.userId);
        res.status(200).json({ userId: req.params.userId });
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );
  

export default router;