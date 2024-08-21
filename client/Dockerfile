FROM node:18-alpine AS development

WORKDIR /app/common

COPY ./common .

WORKDIR /app/client

COPY ./client/package*.json ./

RUN npm install -g @angular/cli@17

RUN npm install

COPY ./client/ .

RUN npm run build