FROM node:18.20-alpine AS development

WORKDIR /app/client

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN npm run build