import express from 'express';
import logger from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);
import redis from 'redis';

import passportConfig from './utils/passport';``

import {createConnection} from 'typeorm'

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import userRouter from './routes/user';

import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

export const app = express();

// Swagger Option
const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: { // API informations (required)
      title: 'Utopier Blog API', // Title (required)
      version: '1.0.0', // Version (required)
      description: "Blog API | email : utopier2025@gmail.com | github : ...", // Description (optional)
    },
    host: 'localhost:2025', // Host (optional)
    basePath: '/', // Base path (optional)
    servers:[
      {
        url:"http://localhost:2025",
        description: "Local Development Environment"
      },
      {
        url:"https://aws-lambda-endpoint",
        description: "AWS Lambda Endpoint"
      }
    ],
    openapi:'3.0.0',
    externalDocs:{
      url: '/api-docs',
      description: "Find more info here"
    },
  },
  // Path to the API docs
  apis: ['./routes/*.*']
};
const swaggerSpec = swaggerJSDoc(options);


const connectionOptions = require('./ormconfig');

// Redis 연결
export const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD
});

console.log(redisClient)

// MySQL 연결
// const connection = await createConnection(connectionOptions)
createConnection(connectionOptions)
  .then(() => {
    console.log('MySQL 연결 성공');
  })
  .catch((err: any) => {
    console.log('MySQL 연결 오류 ' + err);
  });

passportConfig();

// Middleware 적용
if (process.env.NODE_ENV === 'production') {
  app.use(logger('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      // origin: '',
      // credentials: true,
    })
  );
} else {
  app.use(logger('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

// parse application/json
app.use(
  express.json({
    limit: '50mb',
  })
);
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser('Rs89I67YEA55cLMgi0t6oyr8568e6KtD'));
app.use(
  session({
    secret: 'Rs89I67YEA55cLMgi0t6oyr8568e6KtD',
    resave: false,
    saveUninitialized: true,
    name: 'sessionId',
    store: new RedisStore({ client: redisClient }),
    cookie: {
      httpOnly: true,
      secure: false,
      // domain: process.env.NODE_ENV === 'production' && '.nodebird.com',
      expires: new Date(new Date().getTime() + 86400000),
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  // cookie parser 테스트
  console.log(`req.cookies : ${req}`);
  // Session 테스트
  console.log(`req.session : ${req.session}`);
  console.log(`sessionId : ${req.sessionID}`);
  // res.cookie('name', 'utopier');
  // redis 테스트
  // redisClient.set('name', 'utopier');
  // redisClient.get('name', (_err: any, reply: any) => {
  //   console.log(reply);
  // });
  // body-parset 테스트
  console.log(`req.body : ${req.body}`);
  // express 테스트
  res.send('hello express');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/user', userRouter);

const server = app.listen(2025, () => {
  console.log(`server start`);
});
