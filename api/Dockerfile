FROM node:18-alpine AS development

WORKDIR /app/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build