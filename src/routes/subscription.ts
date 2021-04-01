import express from 'express';
const router = express.Router();

import { isLoggedIn } from '../utils/middlewares';

import User from '../entities/User';
import Subscription from '../entities/Subscription';

/**
 * @swagger
 * tags: [Subscription]
 * components:
 *   schemas:
 *   parameters:
 *   securitySchemes:
 *   requestBodies:
 *   responses:
 *   headers:
 *   examples:
 */

/**
 * @swagger
 * /subscription:
 *   post:
 *     summray: Push Subscription
 *     description: Followings New Blog Subscription 
 *     tags:
 *       - Subscription
 */
router.post('/', isLoggedIn, async (req: any, res, next) => {
  const result = await isValidSaveRequest(req, res);
  console.log(req.body.user);
  console.log(req.body.endpoint);
  // const newSubscription = await Subscription.insert({
  //   endpoint: req.body.endpoint,
  //   expirationTime: req.body.expirationTime,
  //   keys: JSON.stringify(req.body.keys),
  // });
  // await User.createQueryBuilder()
  //   .relation(User, 'subscription')
  //   .of(req.user.id)
  //   .set(newSubscription.identifiers[0].id);
  // res.setHeader('Content-Type', 'application/json');
  res.send({ data: { success: true } });
});

// 유효한 Subscription 객체인지 확인
const isValidSaveRequest = (req: any, res: any) => {
  // Check the request body has at least an endpoint.
  if (!req.body || !req.body.endpoint) {
    // Not a valid subscription.
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send(
      JSON.stringify({
        error: {
          id: 'no-endpoint',
          message: 'Subscription must have an endpoint.',
        },
      })
    );
    return false;
  }
  return true;
};

export default router;
