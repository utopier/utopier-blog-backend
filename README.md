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
3. [O]github + slack
   - Slack
     - 워크스페이스 생성 (utopier-blog)
     - App -> Github
     - Github -> /github subscribe utopier/utopier-blog-backend -> /github subscribe list -> /github subscribe list features
   - Github
     - Accout Settings -> Applications -> Slack -> Repository access
4. [O]jira + Slack
   - Slack
     - App -> Jira Cloud
     - /jira connect
   - JIRA
     - Slack Integration -> Edit
   - Slack
     - App -> Jira -> /jira create
5. [O]Software Process(git-flow, agile, Slack, Jira, Software Engineering)
   - **git-flow strategy**
     - master
       - origin/master, Tag
       - 배포준비된 코드
       - 병합시 git hook 스크립트로 자동 배포
     - develop
       - origin/develop
       - 배포하기 위해 개발하는 코드
     - feature
       - 기능 개발 브랜치
       - 시작브랜치: feature
       - 병합대상 브랜치: develop
       - 브랜치 이름 규칙: feature/{issue-number}-{feature-name}
     - release
       - 실제 배포할 상태가 된 경우
       - 시작브랜치: develop
       - 병합대상 브랜치: develop, master
       - 브랜치이름 규칙: origin/release-..., Tag
     - hotfix
       - 배포된 운영버전에서 발생한 문제 해결
       - 시작브랜치: master
       - 병합대상 브랜치: develop, master
       - 브랜치이름 규칙: origin/hotfix-..., Tag
   - **Process**
     - 작업 시작전 JIRA 티켓 생성
     - 하나의 티켓은 하나의 커밋
     - 코드 리뷰 -> Pull Request 및 merge

## 2. Nodejs + Express(+ Middlewares) + Ts + Linting + Testing + Swagger UI

- git branch develop -> git checkout develop
- Slack
  - JIRA -> /jira create -> Backend Development Init Setting

1. [O]nodejs + express(+middlewares)
   - node -v
   - npm init -y
   - npm i express express-session cookie-parser cors morgan passport passport-local bcrypt
   - npm i dotenv cross-env
   - npm i helmet hpp
   - npm i -D nodemon
   - .gitignore
   - .env
   - package.json script 수정
   - src/index.js 초기 코드 작성 후 start
2. [O]typesscript
   - npm i -D typescript ts-node
   - npm i -D @types/node @types/express @types/express-session @types/cookie-parser @types/cors @types/morgan @types/passport @types/passport-local @types/bcrypt @types/hpp
   - tsconfig.json
   - package.json script 수정
3. [O]linting(eslint,prettier,VSC)
   - VSCode Extension 설치
     - ESLint, Prettier
   - ESLint
     - npm i -D eslint
     - npx eslint --init
       - @typescript-eslint/eslint-plugin, @typescript-eslint/parser
       - .eslintrc.json
     - ESLint 적용 확인
   - Prettier
     - npm i -D prettier
     - npm i -D eslint-config-prettier eslint-plugin-prettier
     - .prettierrc.json
     - .eslintrc.json
   - VSCode Format On Save 설정
     - Preferences > Settings > Workspace > Editor: Format On Save(파일 저장시 자동 포맷팅)
       - .vscode/settings.json
     - Prettier 적용확인(Ctrl + S)
4. [O]testing(jest)
   - JavaScript Test
     - npm i -D jest
     - package.json script 수정
     - {파일이름}.test.js
     - Truthiness, Common Matchers, async / await, Callback, test, describe
   - TypeScript Express Test
     - npm i -D ts-jest supertest @types/jest
     - package.json script 수정
     - {파일이름}.test.ts or {파일이름}.test.js
5. []swagger-ui
   - npm i swagger-jsdoc swagger-ui-express
   - npm i -D @types/swagger-jsdoc @types/swagger-ui-express
   - tsconfig.json

## 3. DB Modeling

1. []DB Diagram

## 4. ORM + Database

1. []Local Database
2. []ORM

## 5. API Development with Postman, Swagger Doc, Lambda Function

- Swagger -> Coding -> Postman -> DB & SQL Check-> Lambda Function -> Lambda Local Test
  - [] API Design with Swagger
  - [] Coding
  - [] API Test with Postman
  - [] DB & SQL Check
  - [] Lambda Function
  - [] Lambda Local Test

## 6. CICD Pipeline

1. []CircleCI Pipeline
2. []CircleCI + Github
3. []CircleCI + Slack
4. []CircleCI + JIRA

## 7. Serverless + AWS

1. []Serverless Framework + AWS
