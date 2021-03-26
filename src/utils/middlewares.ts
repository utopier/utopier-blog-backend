import express from 'express';

//import { redisClient } from '../index';

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(req);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

export const isNotLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //  console.log(`req.session : ${req.session}`);
  //  console.log(`sessionId : ${req.sessionID}`);
  //  redisClient.get('sessionId', (_err: any, reply: any) => {
  //    console.log(reply);
  //  });
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};
