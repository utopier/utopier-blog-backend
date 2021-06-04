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
5. [O]swagger-ui
   - npm i swagger-jsdoc swagger-ui-express
   - npm i -D @types/swagger-jsdoc @types/swagger-ui-express
   - tsconfig.json

## 3. DB Modeling

1. []DB Diagram(ERD,sqlDBM)

## 4. ORM + Database

1. []Local Database(MySQL, Redis)
2. [O]ORM(TypeORM)
   - **설치**
     - npm i typeorm
     - npm i mysql
     - ts version 3.3이상, tsconfig.json 옵션 켜기
   - **Connection**
     - touch src/ormconfig.ts
     - connection option 정의
     - index.ts에서 mysql connection
   - **Entities**
     - mkdir src/entities
       - User, Post, Comment, Image, Tag, Subscription
   - **Relations**

## 5. API Development with Postman, Swagger Doc, Lambda Function

- Swagger -> Coding -> Postman -> DB & SQL Check-> Lambda Function -> Lambda Local Test
  - [] API Design with Swagger
  - [] Coding
  - [] API Test with Postman
  - [] DB & SQL Check
  - [] Lambda Function
  - [] Lambda Local Test

## 7. AWS Deployment

1. [O]EC2 서버 생성 및 접속

- AWS Console -> EC2 생성
- 탄력적 IP 연결
- puttygen으로 ppk 파일 생성
- MobaXterm으로 인스턴스 접속

2. [O] Install Package In EC2

- Nodejs
- Git
- pm2
- Redis

3. [] Express RestAPI 서버에 올리기

- [O] RDS
  - RDS Instance 생성
  - VPC 보안 그룹
    - Local MySQL Workbench에서 접속
    - EC2 Instance에서 접속
  - .env DB Setting
  - Local Dev Server Start (DB랑 연결되는지 확인)
- [O] Install Redis In EC2
  - sudo yum install redis
  - sudo systemctl start redis
  - sudo systemctl enable redis
  - ps -e
  - ps -ef | grep redis
- [O] Install Enginx
  - sudo dnf install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - ps -ef | grep nginx
  - sudo netstat -ntlp
  - edit /etc/nginx/nginx.conf
  - AWS Console -> EC2 -> Security Group -> 80포트 접근 허용
  - Browser에서 EC2 Public IP로 접속
- [O] Deploy Express RestAPI in EC2
  - git clone
  - npm install
  - https://hoontae24.github.io/posts/10

4. [] Auto Deploment with CircleCI, CodeDeploy, CodePipeline

- https://jojoldu.tistory.com/281?category=777282
- [] EC2, S3, CodeDeploy, CodeBuild, CodePipeLine, CloudWatch, SlackBot
- git push -> Github -> Git Clone -> CodeBuild -> CodeDeploy -> EC2
- **Code Deploy**

  1. [O] EC2 생성 및 IAM Role 생성

  - AmazonS3FullAccess
  - AWSCodeDeployFullAccess
  - AWSCodeDeployRole
  - CloudWatchLogsFullAccess
  - CloudWatch 활성화
  - Storage : 30GB
  - 탄력적 IP 연결
  - 키페어 다운 -> puttygen 으로 ppk 파일 생성 -> MobaXterm으로 접속

  2. [O] EC2 패키지 설치

  - nodejs
    - curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
    - sudo yum install -y gcc-c++ make
    - sudo yum install -y nodejs
    - node -v
    - which node
  - npm
    - npm -v
    - which npm
  - pm2

    - https://computingforgeeks.com/install-pm2-node-js-process-manager-on-rhel-centos-8/
    - sudo npm i -g pm2
    - which pm2
    - mkdir hello-world-nodejs
    - cd hello-world-nodejs
    - vi app.js

      ```javascript
      const http = require('http');

      http
        .createServer(function (request, response) {
          response.writeHead(200, { 'Content-Type': 'text/plain' });
          response.end('Hello, World!\n');
        })
        .listen(process.env.PORT);

      console.log('App is running...');
      ```

    - pm2 start app.js
    - pm2 list
    - sudo pm2 monitor

  - redis
    - sudo yum install redis
    - sudo systemctl start redis
    - sudo systemctl enable redis
    - sudo systemctl status redis
    - sudo netstat -pnltu | grep redis
    - ps -e
    - ps -ef | grep redis
    - redis-cli
      - ping

  3. [] EC2에 Code Deploy Agent 설치

  - Code Deploy Agent용 사용자 추가
    - EC2에서 AWS CLI를 사용하기 위해서
  - AWS Console -> IAM -> 그룹생성
    - 그룹 -> 권한 -> 인라인 정책 -> 사용자 지정 정책
      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": [
              "autoscaling:*",
              "codedeploy:*",
              "ec2:*",
              "lambda:*",
              "elasticloadbalancing:*",
              "s3:*",
              "cloudwatch:*",
              "logs:*",
              "sns:*"
            ],
            "Resource": "*"
          }
        ]
      }
      ```
  - 사용자 추가 -> 프로그래밍 액세스 방식 -> 그룹에 사용자 추가 -> .csv 다운
  - EC2에 Code Deploy Agent설치
    - sudo npm i -g aws-cli
    - aws configure
    - sudo yum install -y wget
    - sudo aws configure
      - 이전에 생성한 사용자 액세스키, 시크릿키, 리전, json
    - Agent 설치 파일 다운
      - wget https://aws-codedeploy-ap-northeast-2.s3.amazonaws.com/latest/install
      - chmod +x ./install (실행권한 추가)
      - sudo yum install -y ruby
      - sudo ./install auto (설치진행)
      - sudo service codedeploy-agent status (Agent 실행확인)
      - EC2 인스턴스 부팅시 자동 실행 설정
        - sudo vim /etc/init.d/codedeploy-startup.sh
          ```sh
          #!/bin/bash
          echo 'Starting codedeploy-agent'
          sudo service codedeploy-agent restart
          ```
      - sudo chmod +x /etc/init.d/codedeploy-startup.sh ( 실행권한 추가)
    - [O] 프로젝트 생성
      - github repo에 프로젝트 생성
      - appspec.yml 파일 추가
        ```yml
        version: 0.0
        os: linux
        files:
          - source: /
            destination: /home/ec2-user/build/
        ```
        - CodeBuild / S3 / Github 등을 통해 받은 전체 파일들을 /home/ec2-user/build로 옮김
      - EC2에 /home/ec2-user/build 디렉토리 생성
        - mkdir /home/ec2-user/build
    - [O] Code Deploy용 Role 생성
      - IAM -> 역할 만들기 -> CodeDeploy -> AWSCodeDeployRole
    - [O] Code Deploy 생성
      - AWS Console -> AWS Code Deploy -> 애플리케이션 생성 -> EC2 인스턴스 -> 서비스 역할(Code Deploy용 Role)
      - 배포 그룹 생성
    - [O] Code Deploy 실행
      - 배포 그룹 -> 작업 -> 새 계정 배포 -> Github 연결 -> 배포할 버전 커밋 ID 복사 -> Code Deploy에 등록

- **Code Build**

  1.  [O] Code Build 구축

  - CodeBuild -> 프로젝트 만들기 -> Github 연결
  - 코드 빌드 2가지 방법
    - buildspec.yml
    - code build 편집창 커맨드
  - 환경
    - 런타임 버전
    - 빌드 사양(buildspec.yml 사용)
  - 아티팩트(빌드된 파일 보관 위치)
    - S3 버킷
  - 캐시
    - 빌드에 필요한 의존성들 캐시
    - S3에 올려놓고 빌드시 캐시
  - IAM Role 생성

  2. [O] Code Build 실행

  - 빌드 시작
  - 프로젝트 root 위치에 buildspec.yml 추가

    ```yml
    version: 0.2

    phases:
      install:
        commands:
          - echo Insatlling NPM Packages and wget Enviorment File
          - npm install
          - npm install babel-cli cross-env --global
      pre_build:
        commands:
          - echo Nothing to do in the pre_build phase...
      build:
        commands:
          - echo Build started on `date`
          - npm run build
      post_build:
        commands:
          - echo Nothing to do in the post_build phase...
    cache:
      paths:
        - './node_modules/**/*'
    ```

    - phases.build
      - 프로젝트 빌드 시점
      - chmod +x ./gradlew로 gradlew에 실행 권한 추가
      - ./gradlew build로 build
    - phases.post_build
      - phases.build가 끝난 후에 실행되는 시점
      - 빌드 결과물 노출시키는 명령어
    - cache.paths
      - S3에 캐시파일로 등록할 위치
      - https://aws.amazon.com/ko/blogs/devops/how-to-enable-caching-for-aws-codebuild/

  - 빌드 재시도 시 기존에 받던 의존성들 S3에서 파일을 받아 unzip하는지 확인

- **Code Pipeline**

  - Source(Github) -> Build(CodeBuild) -> Stating(CodeDeploy)

  1. [O] Code Pipeline 구축

  - 파이프라인 생성 -> 이름 등록 -> Github 연결 -> 리포지토리, 브랜치, 실행 트리거 선택 -> 빌드 공급자 AWS CodeBuild -> 배포 공급자 AWS CodeDeploy -> IAM Role 생성
  - 배포 전 bilud 디렉토리 비우기
  - buildspec.yml(CodeBuild)

    ```yml
    version: 0.2

    phases:
      build:
        commands:
          - echo Build Starting on `date`
          - chmod +x ./gradlew
          - ./gradlew build
      post_build:
        commands:
          - echo $(basename ./build/libs/*.jar)
          - pwd

    artifacts:
      files:
        - appspec.yml
        - build/libs/*.jar
      discard-paths: yes

    cache:
      paths:
        - '/root/.gradle/caches/**/*'
    ```

    - artifacts.files
      - S3에 업로드할 대상 지정
      - 여기서 지정된 파일들이 zip파일로 S3에 업로드
      - CodeBuild후 CodeDeploy 실행을 위해 appspec.yml 추가
    - artifacts.discard-paths

  - appspec.yml(CodeDeploy)

    ```yml
    version: 0.0
    os: linux
    files:
      - source: /
        destination: /home/ec2-user/build/

    permissions:
      - object: /
        pattern: '**'
        owner: ec2-user
        group: ec2-user
    ```

    - permissions가 없으면 CodeDeploy로 전달되는 파일들의 사용자/그룹이 모두 root로 됨. ec2기본 사용자가 ec-user이기 때문에 배포파일들도 모두 ec2-user에 권한이 있도록 변경

  - CodeDeploy -> 변경 사항 배포
  - EC2에 접속해 build 디렉토리 호가인

  2. [] Code Pipeline으로 프로젝트 실행

  - 서버에 배포된 프로젝트 자동 실행 및 실행 체크
  - scripts/deploy.sh
    - 배포된 프로젝트 실행시킬 스크립트
  - scripts/healthCheck.sh
    - 프로젝트 실행 확인
  - deploy.sh

    ```sh
    #!/bin/bash
    BUILD_PATH=$(ls /home/ec2-user/build/*.jar)
    JAR_NAME=$(basename $BUILD_PATH)
    echo "> build 파일명: $JAR_NAME"

    echo "> build 파일 복사"
    DEPLOY_PATH=/home/ec2-user/
    cp $BUILD_PATH $DEPLOY_PATH

    echo "> springboot-deploy.jar 교체"
    CP_JAR_PATH=$DEPLOY_PATH$JAR_NAME
    APPLICATION_JAR_NAME=springboot-deploy.jar
    APPLICATION_JAR=$DEPLOY_PATH$APPLICATION_JAR_NAME

    ln -Tfs $CP_JAR_PATH $APPLICATION_JAR

    echo "> 현재 실행중인 애플리케이션 pid 확인"
    CURRENT_PID=$(pgrep -f $APPLICATION_JAR_NAME)

    if [ -z $CURRENT_PID ]
    then
      echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
    else
      echo "> kill -15 $CURRENT_PID"
      kill -15 $CURRENT_PID
      sleep 5
    fi

    echo "> $APPLICATION_JAR 배포"
    nohup java -jar $APPLICATION_JAR > /dev/null 2> /dev/null < /dev/null &
    ```

  - healthCheck.sh

    ```sh
    #!/bin/bash
    echo "> Health check 시작"
    echo "> curl -s http://localhost:8080/actuator/health "

    for RETRY_COUNT in {1..15}
    do
      RESPONSE=$(curl -s http://localhost:8080/actuator/health)
      UP_COUNT=$(echo $RESPONSE | grep 'UP' | wc -l)

      if [ $UP_COUNT -ge 1 ]
      then # $up_count >= 1 ("UP" 문자열이 있는지 검증)
          echo "> Health check 성공"
          break
      else
          echo "> Health check의 응답을 알 수 없거나 혹은 status가 UP이 아닙니다."
          echo "> Health check: ${RESPONSE}"
      fi

      if [ $RETRY_COUNT -eq 10 ]
      then
        echo "> Health check 실패. "
        exit 1
      fi

      echo "> Health check 연결 실패. 재시도..."
      sleep 10
    done
    exit 0
    ```

  - 2개의 스크립트 실행시점 appspec.yml에 설정

    ```yml
    version: 0.0
    os: linux
    files:
      - source: /
        destination: /home/ec2-user/build/

    permissions:
      - object: /
        pattern: '**'
        owner: ec2-user
        group: ec2-user

    hooks:
      ApplicationStart:
        - location: deploy.sh
          timeout: 60
          runas: ec2-user
      ValidateService:
        - location: healthCheck.sh
          timeout: 60
          runas: ec2-user
    ```

  - scripts 디렉토리 CodeBuild 대상에 포함되도록 buildspec.yml 수정

    ```yml
    version: 0.2

    phases:
      build:
        commands:
          - echo Build Starting on `date`
          - chmod +x ./gradlew
          - ./gradlew build
      post_build:
        commands:
          - echo $(basename ./build/libs/*.jar)
          - pwd

    artifacts:
      files:
        - appspec.yml
        - build/libs/*.jar
        - scripts/**
      discard-paths: yes

    cache:
      paths:
        - '/root/.gradle/caches/**/*'
    ```

  - git push -> CodePipeline 재배포
  - EC2에서 프로젝트 실행확인

5. [] API Gateway EC2에 연결

## 6. CICD Pipeline

1. []CircleCI Pipeline
2. []CircleCI + Github
3. []CircleCI + Slack
4. []CircleCI + JIRA

## [] API Gateway + EC2

---

## API Features

1. User

- [O] Post /user Sign Up
- [O] Post /user/login login
- [O] Post /user/logout logout
- [O] Get /user Get Me Data

- [O] Patch /user/nickname Update User NickName
- [O] Patch /user/bio Update User bio

- [O..] Post /user/images Update User Avatar
- [O..] Delete /user/images Delete User Avatar

- [O] Patch /user/{userId}/follow User Follow
- [O] Delete /user/{userId}/follow User Unfollow
- [O] Delete /user/follower/{userId} Delete User Follwoer

- [O..] Get /user/followers Get User Followers
- [O..] Get /user/followings Get User Followings
  상대방 User Data 정리(비번 등등)
  DB Table Naming & Cloumn Naming

- [O..] Get /user/{userId} Get User Data
  follow, followings User Data정리 (비번 등)

- [O..] Get /user/{userId}/posts Get User PostList
  response data 정리

2. Users

- [O] Get /users Get User List
- [O] Get /users/search Get User List

3. Post

- [O..] Post /post Create Post
  User 비번 삭제
- [O] Post /post/images
- [O] Delete /post/images

- [O..] Get /post/{postId} Get Post Data
  Author User Password Delete
- [O..] Patch /post/{postId} Update Post Data
  Update Tag
- [O..] Delete /post/{postId} Delete Post
  Delete Tag & MainImg

- [O] Post /post/{postId}/comment Create Post Comment
- [O] Post /post/{postId}/comment/{commentId} Create Post Comment
- [O] Delete /post/{postId}/comment/{commentId}/ Delete Post Comment

- [O] Patch /post/{postId}/like Create Post Like
- [O] Delete /post/{postId}/like Delete Post Like

4. Posts

- [O] Get /posts Get Post List
- [O] Get /posts/search Get Post Searched List
- [O..] Get /posts/{tagId} Get Post List

5. Tags

- [O] Get /tags Get Tag List
- [O] Get /tags/search Get Tag List

6. Subscription

- [] Post /subscription

---

## Prod & Dev Final Check

- [] Jest Auto Test

- [] Swagger & Rest API Design & Refactoring
- [] API Auto Test(Swagger - Postman - DBTools(MySQL,Redis) - Wireshark - Jest)
- [] CICD(Build, Test, Deploy)

- [] Subscription API

- [] API Gateway(Http, Https, ws,wss)
