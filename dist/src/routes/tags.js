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
var Tag_1 = __importDefault(require("../entities/Tag"));
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
router.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skipNum, tags, filtering, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                skipNum = void 0;
                if (parseInt(req.query.lastId, 10)) {
                    skipNum = parseInt(req.query.lastId, 10);
                }
                return [4 /*yield*/, Tag_1.default.findAndCount({
                        select: ['id', 'name', 'createdDate'],
                        relations: ['posts'],
                        order: {
                            createdDate: req.query.orderBy !== 0 ? req.query.orderBy : undefined,
                            // posts: req.query.popular ? req.query.popular : undefined, Front에서 구현
                        },
                        skip: skipNum,
                        take: 10,
                    })];
            case 1:
                tags = _a.sent();
                filtering = !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
                console.log(filtering);
                res
                    .status(200)
                    .json({ tags: tags[0], tagsCount: tags[1], filtering: filtering, skipNum: skipNum });
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
router.get('/search', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skipNum, tagWhere, tags, filtering, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                skipNum = void 0;
                if (parseInt(req.query.lastId, 10)) {
                    skipNum = parseInt(req.query.lastId, 10);
                }
                tagWhere = void 0;
                if (!!req.query.searchQuery) {
                    tagWhere = { name: typeorm_1.Like("%" + req.query.searchQuery + "%") };
                }
                return [4 /*yield*/, Tag_1.default.findAndCount({
                        select: ['id', 'name', 'createdDate'],
                        relations: ['posts'],
                        order: {
                            createdDate: req.query.orderBy !== 0 ? req.query.orderBy : undefined,
                            // posts: req.query.popular ? req.query.popular : undefined, Front에서 구현
                        },
                        where: tagWhere || undefined,
                        skip: skipNum,
                        take: 10,
                    })];
            case 1:
                tags = _a.sent();
                filtering = !!req.query.orderBy || !!req.query.popular || !!req.query.searchQuery;
                console.log(filtering);
                res
                    .status(200)
                    .json({ tags: tags[0], searchedTagsCount: tags[1], filtering: filtering, skipNum: skipNum });
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
exports.default = router;
//# sourceMappingURL=tags.js.map