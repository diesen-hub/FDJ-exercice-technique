FROM node:18-alpine AS development

WORKDIR /app/common

COPY ./common .

WORKDIR /app/api

COPY ./api/package*.json ./

RUN npm install

COPY ./api/ .

RUN npm run build

RUN ls -la /app/api/dist