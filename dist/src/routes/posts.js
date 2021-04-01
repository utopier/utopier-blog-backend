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
var typeorm_1 = require("typeorm");
var Post_1 = __importDefault(require("../entities/Post"));
var Tag_1 = __importDefault(require("../entities/Tag"));
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
router.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skipNum, posts, filtering, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                skipNum = void 0;
                if (parseInt(req.query.lastId, 10)) {
                    skipNum = parseInt(req.query.lastId, 10);
                }
                return [4 /*yield*/, Post_1.default.findAndCount({
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
                            //likers: req.query.popular !== 0 ? req.query.popular : undefined,
                        },
                        skip: skipNum,
                        take: 10,
                    })];
            case 1:
                posts = _a.sent();
                filtering = !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
                res
                    .status(200)
                    .json({ posts: posts[0], postsCount: posts[1], filtering: filtering, skipNum: skipNum });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.get('/search', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skipNum, postWhere, posts, filtering, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                skipNum = void 0;
                postWhere = void 0;
                if (parseInt(req.query.lastId, 10)) {
                    skipNum = parseInt(req.query.lastId, 10);
                }
                if (!!req.query.searchQuery) {
                    postWhere = [
                        { title: typeorm_1.Like("%" + req.query.searchQuery + "%") },
                        { content: typeorm_1.Like("%" + req.query.searchQuery + "%") },
                    ];
                }
                return [4 /*yield*/, Post_1.default.findAndCount({
                        relations: ['mainImgUrl', 'author', 'comments', 'tags', 'likers'],
                        order: {
                            createdDate: req.query.orderBy !== 0 ? req.query.orderBy : undefined,
                            //likers: req.query.popular !== 0 ? req.query.popular : undefined,
                        },
                        where: postWhere || undefined,
                        skip: skipNum,
                        take: 10,
                    })];
            case 1:
                posts = _a.sent();
                filtering = !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
                res
                    .status(200)
                    .json({ posts: posts[0], searchedPostsCount: posts[1], filtering: filtering });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.get('/:tagId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var tag, posts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Tag_1.default.findOne({
                        where: { id: req.params.tagId },
                    })];
            case 1:
                tag = _a.sent();
                console.log(tag);
                if (!tag) {
                    res.status(403).send('태그가 존재하지 않습니다.');
                }
                return [4 /*yield*/, Tag_1.default.createQueryBuilder()
                        .relation(Tag_1.default, 'posts')
                        .of(tag.id)
                        .loadMany()];
            case 2:
                posts = _a.sent();
                res.status(200).json(posts);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=posts.js.map