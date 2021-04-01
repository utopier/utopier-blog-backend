"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var hpp_1 = __importDefault(require("hpp"));
var helmet_1 = __importDefault(require("helmet"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var cors_1 = __importDefault(require("cors"));
var connect_redis_1 = __importDefault(require("connect-redis"));
var RedisStore = connect_redis_1.default(express_session_1.default);
var redis_1 = __importDefault(require("redis"));
var passport_2 = __importDefault(require("./utils/passport"));
var typeorm_1 = require("typeorm");
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var user_1 = __importDefault(require("./routes/user"));
var users_1 = __importDefault(require("./routes/users"));
var post_1 = __importDefault(require("./routes/post"));
var posts_1 = __importDefault(require("./routes/posts"));
var tags_1 = __importDefault(require("./routes/tags"));
// import subscriptionRouter from './routes/subscription';
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/../.env' });
exports.app = express_1.default();
// Swagger Option
var options = {
    swaggerDefinition: {
        info: {
            title: 'Utopier Blog API',
            version: '1.0.0',
            description: "Blog API | email : utopier2025@gmail.com | github : ...", // Description (optional)
        },
        host: 'localhost:2025',
        basePath: '/',
        servers: [
            {
                url: "http://localhost:2025",
                description: "Local Development Environment"
            },
            {
                url: "https://aws-lambda-endpoint",
                description: "AWS Lambda Endpoint"
            }
        ],
        openapi: '3.0.0',
        externalDocs: {
            url: '/api-docs',
            description: "Find more info here"
        },
    },
    // Path to the API docs
    apis: ['./routes/*.*']
};
var swaggerSpec = swagger_jsdoc_1.default(options);
var connectionOptions = require('./ormconfig');
// Redis 연결
exports.redisClient = redis_1.default.createClient({
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD
});
console.log(exports.redisClient);
// MySQL 연결
// const connection = await createConnection(connectionOptions)
typeorm_1.createConnection(connectionOptions)
    .then(function () {
    console.log('MySQL 연결 성공');
})
    .catch(function (err) {
    console.log('MySQL 연결 오류 ' + err);
});
passport_2.default();
// Middleware 적용
if (process.env.NODE_ENV === 'production') {
    exports.app.use(morgan_1.default('combined'));
    exports.app.use(hpp_1.default());
    exports.app.use(helmet_1.default());
    exports.app.use(cors_1.default({
    // origin: '',
    // credentials: true,
    }));
}
else {
    exports.app.use(morgan_1.default('dev'));
    exports.app.use(cors_1.default({
        origin: true,
        credentials: true,
    }));
}
// parse application/json
exports.app.use(express_1.default.json({
    limit: '50mb',
}));
// parse application/x-www-form-urlencoded
exports.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
exports.app.use(cookie_parser_1.default('Rs89I67YEA55cLMgi0t6oyr8568e6KtD'));
exports.app.use(express_session_1.default({
    secret: 'Rs89I67YEA55cLMgi0t6oyr8568e6KtD',
    resave: false,
    saveUninitialized: true,
    name: 'sessionId',
    store: new RedisStore({ client: exports.redisClient }),
    cookie: {
        httpOnly: true,
        secure: false,
        // domain: process.env.NODE_ENV === 'production' && '.nodebird.com',
        expires: new Date(new Date().getTime() + 86400000),
    },
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.get('/', function (req, res) {
    // cookie parser 테스트
    console.log("req.cookies : " + req);
    // Session 테스트
    console.log("req.session : " + req.session);
    console.log("sessionId : " + req.sessionID);
    // res.cookie('name', 'utopier');
    // redis 테스트
    // redisClient.set('name', 'utopier');
    // redisClient.get('name', (_err: any, reply: any) => {
    //   console.log(reply);
    // });
    // body-parset 테스트
    console.log("req.body : " + req.body);
    // express 테스트
    res.send('hello express');
});
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.app.use('/user', user_1.default);
exports.app.use('/users', users_1.default);
exports.app.use('/post', post_1.default);
exports.app.use('/posts', posts_1.default);
exports.app.use('/tags', tags_1.default);
// app.use('/subscription', subscriptionRouter);
var server = exports.app.listen(2025, function () {
    console.log("server start");
});
//# sourceMappingURL=index.js.map