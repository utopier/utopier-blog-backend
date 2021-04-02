#!/bin/bash

# node 프로세스 PID 확인 : pgrep node
CURRENT_PID = $(pgrep node)
echo "Node Process PID 확인 : ${CURRENT_PID}"

# process kill : kill -9 processid
echo "Current Node Process Kill"
kill -15 $CURRENT_PID
sleep 5

# App restart
echo "App Restart"
npm run start

# 2025 port 실행확인
echo "2025 port 실행확인"
netstat -anp | grep 2025

# App 실행확인
echo "App 실행확인"
ps -ef | grep node

# redis 실행확인
echo "redis 실행확인"
ps -ef | grep redis