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
exports.s3 = exports.upload = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var middlewares_1 = require("../utils/middlewares");
var User_1 = __importDefault(require("../entities/User"));
var Post_1 = __importDefault(require("../entities/Post"));
var Image_1 = __importDefault(require("../entities/Image"));
var Comment_1 = __importDefault(require("../entities/Comment"));
var Tag_1 = __importDefault(require("../entities/Tag"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
try {
    fs_1.default.accessSync('uploads');
}
catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs_1.default.mkdirSync('uploads');
}
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});
exports.upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: new aws_sdk_1.default.S3(),
        bucket: 'utopier-blog-dev-storage',
        key: function (req, file, cb) {
            console.log(req);
            console.log('multer : ', file);
            cb(null, "original/" + Date.now() + "_" + path_1.default.basename(file.originalname));
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
exports.s3 = new aws_sdk_1.default.S3();
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
router.post('/', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post_1, extTag, newTag, image, test_1, fullPost, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 14, , 15]);
                return [4 /*yield*/, Post_1.default.insert({
                        author: req.user.id,
                        title: req.body.title,
                        content: req.body.content,
                    })];
            case 1:
                post_1 = _a.sent();
                if (!Array.isArray(req.body.tags)) return [3 /*break*/, 3];
                console.log('req.body.tag : ', req.body.tags);
                return [4 /*yield*/, Promise.all(req.body.tags.map(function (tagName) { return __awaiter(void 0, void 0, void 0, function () {
                        var extTag, newTag, newPost;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Tag_1.default.findOne({
                                        name: tagName,
                                    })];
                                case 1:
                                    extTag = _a.sent();
                                    if (!extTag) return [3 /*break*/, 3];
                                    return [4 /*yield*/, Post_1.default.createQueryBuilder()
                                            .relation(Post_1.default, 'tags')
                                            .of(post_1.identifiers[0].id)
                                            .add(extTag.id)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 3: return [4 /*yield*/, Tag_1.default.insert({
                                        name: tagName,
                                    })];
                                case 4:
                                    newTag = _a.sent();
                                    console.log(newTag);
                                    return [4 /*yield*/, Post_1.default.createQueryBuilder()
                                            .relation(Post_1.default, 'tags')
                                            .of(post_1.identifiers[0].id)
                                            .add(newTag.identifiers[0].id)];
                                case 5:
                                    newPost = _a.sent();
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _a.sent();
                return [3 /*break*/, 9];
            case 3: return [4 /*yield*/, Tag_1.default.findOne({
                    name: req.body.tags,
                })];
            case 4:
                extTag = _a.sent();
                if (!extTag) return [3 /*break*/, 6];
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'tags')
                        .of(post_1.identifiers[0].id)
                        .add(extTag.id)];
            case 5:
                _a.sent();
                return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, Tag_1.default.insert({
                    name: req.body.tags,
                })];
            case 7:
                newTag = _a.sent();
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'tags')
                        .of(post_1.identifiers[0].id)
                        .add(newTag.identifiers[0].id)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                if (!req.body.mainImgUrl) return [3 /*break*/, 12];
                return [4 /*yield*/, Image_1.default.insert({ src: req.body.mainImgUrl })];
            case 10:
                image = _a.sent();
                console.log(image);
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'mainImgUrl')
                        .of(post_1.identifiers[0].id)
                        .set(image.identifiers[0].id)];
            case 11:
                test_1 = _a.sent();
                console.log(test_1);
                _a.label = 12;
            case 12: return [4 /*yield*/, Post_1.default.getRepository().findOne({
                    where: { id: post_1.identifiers[0].id },
                    relations: ['author', 'comments', 'mainImgUrl', 'tags', 'likers'],
                })];
            case 13:
                fullPost = _a.sent();
                res.status(201).json(fullPost);
                return [3 /*break*/, 15];
            case 14:
                error_1 = _a.sent();
                console.error(error_1);
                next(error_1);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); });
router.post('/images', middlewares_1.isLoggedIn, exports.upload.array('image'), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // POST /post/images
        console.log('req.files', req.files);
        res.json(req.files[0].location);
        return [2 /*return*/];
    });
}); });
router.delete('/images', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // DELETE /post/image
        exports.s3.deleteObject({
            Bucket: 'utopier-test-s3',
            Key: req.query.imgPath, // 버켓 내 경로
        }, function (err, data) {
            if (err) {
                throw err;
            }
            console.log('s3 deleteObject ', data);
        });
        // console.log(path.join(__dirname, '..', '/', req.query.imgPath));
        // fs.unlink(path.join(__dirname, '..', req.query.imgPath), function (err) {
        //   if (err) throw err;
        //   console.log('file deleted');
        // });
        res.json(req.body.imgPath);
        return [2 /*return*/];
    });
}); });
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
router.get('/:postId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post, fullPost, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // GET /post/{postId}
                console.log('req.params: ', req.params);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Post_1.default.findOne({
                        where: { id: req.params.postId },
                    })];
            case 2:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(404).send('존재하지 않는 게시글')];
                }
                return [4 /*yield*/, Post_1.default.getRepository().findOne({
                        where: { id: post.id },
                        relations: [
                            'author',
                            'comments',
                            'comments.user',
                            'tags',
                            'mainImgUrl',
                            'likers',
                        ],
                    })];
            case 3:
                fullPost = _a.sent();
                res.status(200).json(fullPost);
                return [3 /*break*/, 5];
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
router.patch('/:postId', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newPost_1, extTag, newTag, image, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                return [4 /*yield*/, Post_1.default.update({
                        id: req.params.postId,
                    }, {
                        title: req.body.title,
                        content: req.body.content,
                    })];
            case 1:
                newPost_1 = _a.sent();
                console.log('newPost : ', newPost_1);
                if (!Array.isArray(req.body.tags)) return [3 /*break*/, 3];
                return [4 /*yield*/, Promise.all(req.body.tags.map(function (tagName) { return __awaiter(void 0, void 0, void 0, function () {
                        var extTag, newTag;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Tag_1.default.findOne({
                                        name: tagName,
                                    })];
                                case 1:
                                    extTag = _a.sent();
                                    if (!extTag) return [3 /*break*/, 3];
                                    return [4 /*yield*/, Post_1.default.createQueryBuilder()
                                            .relation(Post_1.default, 'tags')
                                            .of(req.params.postId)
                                            .add(extTag.id)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 3: return [4 /*yield*/, Tag_1.default.insert({
                                        name: tagName,
                                    })];
                                case 4:
                                    newTag = _a.sent();
                                    console.log(newTag);
                                    return [4 /*yield*/, Post_1.default.createQueryBuilder()
                                            .relation(Post_1.default, 'tags')
                                            .of(req.params.postId)
                                            .add(newTag.identifiers[0].id)];
                                case 5:
                                    newPost_1 = _a.sent();
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _a.sent();
                return [3 /*break*/, 9];
            case 3: return [4 /*yield*/, Tag_1.default.findOne({
                    name: req.body.tags,
                })];
            case 4:
                extTag = _a.sent();
                if (!extTag) return [3 /*break*/, 6];
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'tags')
                        .of(req.params.postId)
                        .add(extTag.id)];
            case 5:
                _a.sent();
                return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, Tag_1.default.insert({
                    name: req.body.tags,
                })];
            case 7:
                newTag = _a.sent();
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'tags')
                        .of(req.params.postId)
                        .add(newTag.identifiers[0].id)];
            case 8:
                newPost_1 = _a.sent();
                _a.label = 9;
            case 9:
                if (!req.body.mainImgUrl) return [3 /*break*/, 12];
                return [4 /*yield*/, Image_1.default.insert({ src: req.body.mainImgUrl })];
            case 10:
                image = _a.sent();
                console.log('prev img update : ', newPost_1);
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'mainImgUrl')
                        .of(req.params.postId)
                        .set(image.identifiers[0].id)];
            case 11:
                newPost_1 = _a.sent();
                console.log('img update : ', newPost_1);
                _a.label = 12;
            case 12:
                res.status(200).json({
                    postId: req.params.postId,
                    newPost: newPost_1,
                });
                return [3 /*break*/, 14];
            case 13:
                error_3 = _a.sent();
                console.error(error_3);
                next(error_3);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); });
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
router.delete('/:postId', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedPost, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.delete({
                        id: req.params.postId,
                    })];
            case 1:
                deletedPost = _a.sent();
                if (deletedPost.affected) {
                    res.status(200).json({ postId: req.params.postId });
                }
                else {
                    res.status(404).send('postId에 일치하는 포스트가 없음');
                }
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
router.post('/:postId/comment', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post, comment, fullComment, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, Post_1.default.findOne({
                        where: { id: req.params.postId },
                    })];
            case 1:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(403).send('존재하지 않는 게시글입니다.')];
                }
                return [4 /*yield*/, Comment_1.default.insert({
                        content: req.body.content,
                    })];
            case 2:
                comment = _a.sent();
                return [4 /*yield*/, User_1.default.createQueryBuilder()
                        .relation(User_1.default, 'comments')
                        .of(req.user.id)
                        .add(comment.identifiers[0].id)];
            case 3:
                _a.sent();
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'comments')
                        .of(post.id)
                        .add(comment.identifiers[0].id)];
            case 4:
                _a.sent();
                return [4 /*yield*/, Comment_1.default.getRepository().findOne({
                        where: { id: comment.identifiers[0].id },
                        relations: ['user', 'post'],
                    })];
            case 5:
                fullComment = _a.sent();
                res.status(201).json(fullComment);
                return [3 /*break*/, 7];
            case 6:
                error_5 = _a.sent();
                console.error(error_5);
                next(error_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
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
router.patch('/:postId/comment/:commentId', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Comment_1.default.update({ id: req.params.commentId }, {
                        content: req.body.content,
                    })];
            case 1:
                _a.sent();
                res
                    .status(200)
                    .json({ id: req.params.commentId, content: req.body.content });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.delete('/:postId/comment/:commentId', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Comment_1.default.findOne({
                        where: { id: req.params.commentId, user: { id: req.user.id } },
                    })];
            case 1:
                comment = _a.sent();
                if (!comment) {
                    return [2 /*return*/, res.status(403).send('존재하지 않는 댓글')];
                }
                return [4 /*yield*/, Comment_1.default.createQueryBuilder()
                        .relation(Comment_1.default, 'post')
                        .of(comment.id)
                        .set(null)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Comment_1.default.delete({ id: comment.id })];
            case 3:
                _a.sent();
                res.status(200).json({
                    postId: req.params.postId,
                    commentId: req.params.commentId,
                    userId: req.user.id,
                });
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
router.patch('/:postId/like', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findOne({ where: { id: req.params.postId } })];
            case 1:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(403).send('존재하지 않는 게시글')];
                }
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'likers')
                        .of(post.id)
                        .add(req.user.id)];
            case 2:
                _a.sent();
                res.status(201).json({ postId: req.params.postId, userId: req.user.id });
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
router.delete('/:postId/like', middlewares_1.isLoggedIn, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findOne({ where: { id: req.params.postId } })];
            case 1:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(403).send('존재하지 않는 게시글')];
                }
                return [4 /*yield*/, Post_1.default.createQueryBuilder()
                        .relation(Post_1.default, 'likers')
                        .of(post.id)
                        .remove(req.user.id)];
            case 2:
                _a.sent();
                res.json({ postId: req.params.postId, userId: req.user.id });
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
exports.default = router;
//# sourceMappingURL=post.js.map