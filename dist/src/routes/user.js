"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var bcrypt_1 = __importDefault(require("bcrypt"));
var passport_1 = __importDefault(require("passport"));
var middlewares_1 = require("../utils/middlewares");
var post_1 = require("./post");
var User_1 = __importDefault(require("../entities/User"));
var Image_1 = __importDefault(require("../entities/Image"));
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
router.post('/', middlewares_1.isNotLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var exUser, hashedPassword, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                console.log('user signup router req : ', req.body);
                return [4 /*yield*/, User_1.default.findOne({
                        where: { email: req.body.email },
                    })];
            case 1:
                exUser = _a.sent();
                if (exUser) {
                    return [2 /*return*/, res.status(409).json({ status: 'error', message: '이미 사용 중인 아이디입니다.' })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 12)];
            case 2:
                hashedPassword = _a.sent();
                // INSERT INTO 'user' ('email','nickname','password') VALUES ('test@test.com','testnick','12341234aA!');
                // id는 typeorm  @PrimaryGeneratedColumn('uuid')로 생성해서 넣음.
                // password는 bcrypt로 hash화해서 넣음.
                return [4 /*yield*/, User_1.default.insert({
                        email: req.body.email,
                        nickname: req.body.nickname,
                        password: hashedPassword,
                    })];
            case 3:
                // INSERT INTO 'user' ('email','nickname','password') VALUES ('test@test.com','testnick','12341234aA!');
                // id는 typeorm  @PrimaryGeneratedColumn('uuid')로 생성해서 넣음.
                // password는 bcrypt로 hash화해서 넣음.
                _a.sent();
                res.status(201).json({ status: 'success' });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(400).json({ status: 'error', message: error_1 });
                console.error(error_1);
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.post('/login', middlewares_1.isNotLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // POST /user/login
        passport_1.default.authenticate('local', function (err, user, info) {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(500).json(info.message);
            }
            return req.login(user, function (loginErr) { return __awaiter(void 0, void 0, void 0, function () {
                var fullUserWithoutPassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (loginErr) {
                                console.error(loginErr);
                                return [2 /*return*/, next(loginErr)];
                            }
                            return [4 /*yield*/, User_1.default.getRepository().findOne({
                                    where: { id: user.id },
                                    select: ['id', 'email', 'nickname'],
                                })];
                        case 1:
                            fullUserWithoutPassword = _a.sent();
                            return [2 /*return*/, res.status(200).json(fullUserWithoutPassword)];
                    }
                });
            }); });
        })(req, res, next);
        return [2 /*return*/];
    });
}); });
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
router.post('/logout', middlewares_1.isLoggedIn, function (req, res) {
    // req.user 객체 제거
    req.logout();
    // session 객체 내용 제거
    req.session.destroy();
    // res.redirect('/');
    res.status(200).json({
        status: 'success'
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
router.get('/', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fullUserWithoutPassword, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                return [4 /*yield*/, User_1.default.getRepository().findOne({
                        where: { id: req.user.id },
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
                    })];
            case 1:
                fullUserWithoutPassword = _a.sent();
                res.status(200).json(fullUserWithoutPassword);
                return [3 /*break*/, 3];
            case 2:
                res.status(200).json(null);
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.patch('/nickname', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // UPDATE user SET nickname = 'sqlupdate', updatedDate = CURRENT_TIMESTAMP WHERE id = 'db16d68a-47c5-4362-8535-02ad9d2f5806'
                return [4 /*yield*/, User_1.default.update({ id: req.user.id }, {
                        nickname: req.body.nickname,
                    })];
            case 1:
                // UPDATE user SET nickname = 'sqlupdate', updatedDate = CURRENT_TIMESTAMP WHERE id = 'db16d68a-47c5-4362-8535-02ad9d2f5806'
                _a.sent();
                res.status(200).json({ nickname: req.body.nickname });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.patch('/bio', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // UPDATE user SET bio = 'sqlupdate', updatedDate = CURRENT_TIMESTAMP WHERE id = 'db16d68a-47c5-4362-8535-02ad9d2f5806'
                return [4 /*yield*/, User_1.default.update({ id: req.user.id }, {
                        bio: req.body.bio,
                    })];
            case 1:
                // UPDATE user SET bio = 'sqlupdate', updatedDate = CURRENT_TIMESTAMP WHERE id = 'db16d68a-47c5-4362-8535-02ad9d2f5806'
                _a.sent();
                res.status(200).json({ bio: req.body.bio });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.post('/images', middlewares_1.isLoggedIn, post_1.upload.array('image'), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('images post router req : ', req.files[0]);
                return [4 /*yield*/, Image_1.default.insert({ src: req.files[0].location })];
            case 1:
                image = _a.sent();
                // UPDATE user SET avatarId = 'imageId', updatedDate = CURRENT_TIMESTAMP WHERE id IN 'userId'
                return [4 /*yield*/, User_1.default.createQueryBuilder()
                        .relation(User_1.default, 'avatar')
                        .of(req.user.id)
                        .set(image.identifiers[0].id)];
            case 2:
                // UPDATE user SET avatarId = 'imageId', updatedDate = CURRENT_TIMESTAMP WHERE id IN 'userId'
                _a.sent();
                res.status(201).json(req.files[0].location);
                return [2 /*return*/];
        }
    });
}); });
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
router.delete('/images', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // DELETE /post/image
                post_1.s3.deleteObject({
                    Bucket: 'utopier-blog-dev-storage',
                    Key: req.query.imgPath, // 버켓 내 경로
                }, function (err, data) {
                    if (err) {
                        throw err;
                    }
                });
                // DELETE FROM image from WHERE src = 'req.params.imgPath'
                return [4 /*yield*/, Image_1.default.delete({ src: req.params.imgPath })];
            case 1:
                // DELETE FROM image from WHERE src = 'req.params.imgPath'
                _a.sent();
                // UPDATE user SET avatarId = null, updatedDate = CURRENT_TIMESRAMP WHERE id IN 'userId'
                return [4 /*yield*/, User_1.default.createQueryBuilder()
                        .relation(User_1.default, 'avatar')
                        .of(req.user.id)
                        .set(null)];
            case 2:
                // UPDATE user SET avatarId = null, updatedDate = CURRENT_TIMESRAMP WHERE id IN 'userId'
                _a.sent();
                res.json(req.body.imgPath);
                return [2 /*return*/];
        }
    });
}); });
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
router.patch('/:userId/follow', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, me, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, User_1.default.find({
                        where: { id: +req.params.userId },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(403).send('없는 사람입니다');
                }
                return [4 /*yield*/, User_1.default.findOne({ where: { id: req.user.id } })];
            case 2:
                me = _a.sent();
                console.log("req.params.userId : " + req.params.userId);
                // INSERT INTO user_followers_user (userId_1, userId_2) VALUES ('req.params.userId', 'req.user.id')
                return [4 /*yield*/, User_1.default.createQueryBuilder()
                        .relation(User_1.default, 'followings')
                        .of(me.id)
                        .add(+req.params.userId)];
            case 3:
                // INSERT INTO user_followers_user (userId_1, userId_2) VALUES ('req.params.userId', 'req.user.id')
                _a.sent();
                res.status(201).json({ userId: req.params.userId });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.error(error_5);
                next(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.delete('/:userId/follow', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, me, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({
                        where: { id: +req.params.userId },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(403).json('없는 사람입니다');
                }
                return [4 /*yield*/, User_1.default.findOne({ where: { id: req.user.id } })];
            case 2:
                me = _a.sent();
                // INSERT INTO user_followers_user (userId_1, userId_2) VALUES ('req.params.userId', 'req.user.id')
                return [4 /*yield*/, User_1.default.createQueryBuilder()
                        .relation(User_1.default, 'followings')
                        .of(me.id)
                        .remove(+req.params.userId)];
            case 3:
                // INSERT INTO user_followers_user (userId_1, userId_2) VALUES ('req.params.userId', 'req.user.id')
                _a.sent();
                res.status(201).json({ userId: req.params.userId });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.error(error_6);
                next(error_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.delete('/follower/:userId', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, me, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({
                        where: { id: +req.params.userId },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(403).send('존재하지 않는 유저');
                }
                return [4 /*yield*/, User_1.default.findOne({ where: { id: req.user.id } })];
            case 2:
                me = _a.sent();
                // DELETE FROM user_followers_user WHERE userId_1 = 'req.user.id' AND userId_2 = 'req.params.userId
                return [4 /*yield*/, User_1.default.createQueryBuilder()
                        .relation(User_1.default, 'followers')
                        .of(me.id)
                        .remove(+req.params.userId)];
            case 3:
                // DELETE FROM user_followers_user WHERE userId_1 = 'req.user.id' AND userId_2 = 'req.params.userId
                _a.sent();
                res.status(200).json({ userId: req.params.userId });
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.error(error_7);
                next(error_7);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /user/followers:
 *   get:
 *     summary: Get User Followers
 *     description: Get User Followers
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
 *         description: User Followers List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: fab71182-ee85-4d37-a671-c7e582b32258
 *                 followers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/responses/userFollowing'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/isLogged In'
 *       '403':
 *         description: No Existing User
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 존재하지 않는 유저
 */
router.get('/followers', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, followers, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findOne({ where: { id: req.user.id } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(403).send('존재하지 않는 유저');
                }
                return [4 /*yield*/, User_1.default.getRepository().find({
                        where: { id: req.user.id },
                        select: ['id'],
                        relations: ['followers'],
                        take: 10,
                    })];
            case 2:
                followers = _a.sent();
                res.status(200).json({
                    userId: followers[0].id,
                    followers: followers[0].followers
                });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.error(error_8);
                next(error_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /user/followings:
 *   get:
 *     summary: Get User Followings
 *     description: Get User Followings
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
 *         description: User Followings List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: fab71182-ee85-4d37-a671-c7e582b32258
 *                 followings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/responses/userFollowing'
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
router.get('/followings', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, followings, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findOne({ where: { id: req.user.id } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(403).send('존재하지 않는 유저');
                }
                return [4 /*yield*/, User_1.default.getRepository().find({
                        where: { id: req.user.id },
                        select: ['id'],
                        relations: ['followings'],
                        take: 10,
                    })];
            case 2:
                followings = _a.sent();
                res.status(200).json({
                    userId: followings[0].id,
                    followings: followings[0].followings
                });
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                console.error(error_9);
                next(error_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get User Data
 *     description: Get User Data
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
 *     responses:
 *       '200':
 *         description: User Data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: /#components/responses/userData
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
 *               example: 존재하지 않는 사용자
 */
router.get('/:userId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fullUserWithoutPassword, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.getRepository().findOne({
                        where: { id: req.params.userId },
                        select: ['id', 'email', 'nickname'],
                        relations: [
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
                    })];
            case 1:
                fullUserWithoutPassword = _a.sent();
                if (fullUserWithoutPassword) {
                    console.log(fullUserWithoutPassword);
                    // data.Posts = data.Posts.length; // 개인정보 침해 예방
                    // data.Followers = data.Followers.length;
                    // data.Followings = data.Followings.length;
                    res.status(200).json(fullUserWithoutPassword);
                }
                else {
                    res.status(403).json('존재하지 않는 사용자');
                }
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.error(error_10);
                next(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /user/{userId}/posts:
 *   get:
 *     summary: Get User PostList
 *     description: Get User PostList
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
 *     responses:
 *       '200':
 *         description: User Data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: b7191cd9-cc54-4251-863a-17269355223f
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2020-12-10T05:06:17.969Z
 *                   updatedDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2020-12-10T05:06:17.969Z
 *                   title:
 *                     type: string
 *                     example: swagger
 *                   content:
 *                     type: string
 *                     example: blahh.....
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
 *               example: 존재하지 않는 사용자
 */
router.get('/:userId/posts', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.createQueryBuilder()
                        .relation(User_1.default, 'posts')
                        .of(req.user.id)
                        .loadMany()];
            case 1:
                posts = _a.sent();
                res.status(200).json(posts);
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                console.error(error_11);
                next(error_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=user.js.map