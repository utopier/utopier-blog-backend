import express from 'express';
import logger from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import passport from 'passport';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(logger('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: 'http://nodebird.com',
      credentials: true,
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

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser('Rs89I67YEA55cLMgi0t6oyr8568e6KtD'));
app.use(
  session({
    secret: 'Rs89I67YEA55cLMgi0t6oyr8568e6KtD',
    resave: false,
    saveUninitialized: true,
    name: 'sessionId',
    //store: new RedisStore({ client: redisClient }),
    cookie: {
      httpOnly: true,
      secure: false,
      // domain: process.env.NODE_ENV === 'production' && '.nodebird.com',
      expires: new Date(new Date().getTime() + 86400000),
    },
  })
);

app.get('/', (req, res) => {
  // cookie parser 테스트
  console.log(`req.cookies : ${req}`);
  // Session 테스트
  console.log(`req.session : ${req.session}`);
  console.log(`sessionId : ${req.sessionID}`);
  // res.cookie('name', 'utopier');
  // redis 테스트
  // redisClient.set('name', 'zerocho');
  // redisClient.get('name', (_err: any, reply: any) => {
  //   console.log(reply);
  // });
  // body-parset 테스트
  console.log(`req.body : ${req.body}`);
  // express 테스트
  res.send('hello express');
});

const server = app.listen(2025, () => {
  console.log(`server start`);
});
