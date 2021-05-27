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

import socketio from 'socket.io';

import passportConfig from './utils/passport';

import {createConnection} from 'typeorm'

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import userRouter from './routes/user';
import usersRouter from './routes/users';
import postRouter from './routes/post';
import postsRouter from './routes/posts';
import tagsRouter from './routes/tags';
// import subscriptionRouter from './routes/subscription';

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


// Redis 연결
export const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD
});

console.log(redisClient)

// MySQL 연결
createConnection({
  type:"mysql",
  host:process.env.DB_ENDPOINT,
  port:3306,
  username:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:"blogdb",
  entities:[
    "entities/**/*.*"
  ],
  synchronize: true,
  logging: true
})
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
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/tags', tagsRouter);
// app.use('/subscription', subscriptionRouter);

const server = app.listen(2025, () => {
  console.log(`server start`);
});

const io = socketio(server);

let chatUsers: any[] = [];

io.on('connection', (socket) => {
  console.log('connected');
  console.log('connected socket object : ', socket);
  console.log('connected socket id : ',socket.conn.id)
  socket.on('message', (data) => {
    console.log(data);
    io.emit('message', data);
  });
  socket.on('join', (data) => {
    chatUsers.push({socketId:socket.id,...data});
    console.log('join : ', data);
    console.log('join chatUser :', chatUsers);
    io.emit('join', { data, chatUsers });
  });
  socket.on('leave', (data) => {
    chatUsers = chatUsers.filter(({ nickname }) => nickname !== data.nickname);
    console.log('leave : ', data);
    console.log('leave chatUser :', chatUsers);
    socket.broadcast.emit('leave', { data, chatUsers });
  });
  // browser 창 닫을시
  socket.on('disconnect', () => {
    console.log('disconnect');
    console.log('disconnect socket id : ', socket.id);
    const disconnectedSocketId = socket.id;
    chatUsers = chatUsers.filter(({ socketId }) => socketId !== socket.id);
    console.log('disconnected chatUsers : ', chatUsers);
    socket.broadcast.emit('disconnectEvt', { disconnectedSocketId,  chatUsers });
  })
});