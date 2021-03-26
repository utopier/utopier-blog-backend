import User from '../src/entities/User';

// req.uesr.id Error 해결
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}