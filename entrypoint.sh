#!/bin/sh

dockerize -wait tcp://mysql:3306 -timeout 60s

npx prisma migrate dev --name init

exec "$@"
