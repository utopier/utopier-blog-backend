"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
//import { redisClient } from '../index';
var isLoggedIn = function (req, res, next) {
    console.log(req);
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send('로그인이 필요합니다.');
    }
};
exports.isLoggedIn = isLoggedIn;
var isNotLoggedIn = function (req, res, next) {
    //  console.log(`req.session : ${req.session}`);
    //  console.log(`sessionId : ${req.sessionID}`);
    //  redisClient.get('sessionId', (_err: any, reply: any) => {
    //    console.log(reply);
    //  });
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
};
exports.isNotLoggedIn = isNotLoggedIn;
//# sourceMappingURL=middlewares.js.map