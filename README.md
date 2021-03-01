# Workflow

## 1. github, jira, slack, confluence

1. [O]github
   - Git Hosting Service로 github 사용
   - New Repository 생성
     - https://github.com/utopier/utopier-blog-backend.git
   - git init
   - git add .
   - git commit -m 'First Commit'
   - git remote add origin https://github.com/utopier/utopier-blog-backend.git
   - git push --set-upstream origin master
   - git push -u origin master
2. [O]github + jira
   - Smart Commit (JIRA + Github)
   - Jira
     - 프로젝트 만들기 (이름: utopier-blog, 키: UB, 칸반)
     - App -> Github for Jira
     - 앱관리 -> Github -> Configuration
     - 프로젝트 -> 항목추가 -> 저장소 -> https://github.com/utopier/utopier-blog-backend.git
     - Smart Commit Test
3. []github + slack
   - Slack
     - 워크스페이스 생성 (utopier-blog)
     - App -> Github
     - Github -> /github subscribe utopier/utopier-blog-backend -> /github subscribe list -> /github subscribe list features
   - Github
     - Accout Settings -> Applications -> Slack -> Repository access
4. []jira + slack
5. []Software Process(git-flow, agile)

## 2. Nodejs + Express(+ Middlewares) + Ts + Linting + Testing + Swagger UI

1. []nodejs + express(+middlewares)
2. []typesscript
3. []linting
4. []testing
5. []swagger-ui

## 3. DB Modeling

1. []DB Diagram

## 4. ORM + Database

1. []Local Database
2. []ORM

## 5. API Development with Postman, Swagger Doc, Lambda Function

1. Swagger -> Coding -> Postman -> DB & SQL Check-> Lambda Function -> Lambda Local Test

## 6. CICD Pipeline

1. []CircleCI Pipeline
2. []CircleCI + Github
3. []CircleCI + Slack

## 7. Serverless + AWS

1. []Serverless framework + AWS
