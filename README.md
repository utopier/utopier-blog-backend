# Blog Backend

- **URL** : https://lwdc6kzck0.execute-api.ap-northeast-2.amazonaws.com/api-docs/
- **Feature Video List** : https://www.youtube.com/playlist?list=PLshiIDc3Xos0TVOANMYGLDr7mtmheA3J8
- **Repository**
  - Frontend Repository : https://github.com/utopier/utopier-blog-frontend
  - Design System Repository : https://github.com/utopier/utopier-blog-design-guide

---

## Stack

- **runtime** : nodejs
- **Type Check** : typescript
- **Web Framework** : express
  - **Middlewares** : cors, morgan, express-session, cookie-parser, passport, error-handling
  - **Environment Variables** : dotenv, cross-env
  - **Nodejs Process manager** : pm2
  - **Security** : Let's Encrypt(TLS), helmet, Cookie Security, snyk, csurf, sqlmap, nmap, sslyze, safe-regex, hpp
  - **Performance** : compression, --trace-sync-io ,winston, Error Handling(try/catch, promise, uncaughtException), production, pm2, Nginx (Caching, Load Balancing, Proxt Server)
- **Real Time** : socket.io
- **API**
  - **API Architecture** : REST API
  - **API Documentation** : Swagger
  - **API Testing Tool** : Postman
- **ORM** : TypeORM
- **Database**

  - **Relational Database** : MySQL(RDS)
  - **In memory Database** : Redis

- **Deployment**

  - **CICD Tool** : AWS CodePipeline
  - **Cloud Service Provider** : AWS
  - **AWS Resources** : EC2(Linux, Redis), RDS, API Gateway, IAM

  - **VCS(Virsion Contol System)** : git, sourcetree
  - **Branch Management** : git-flow
  - **Issue Tracker(with Smart Commit)** : Jira
  - **Collaboration software** : Slack
