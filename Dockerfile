FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .

RUN npm run build
RUN npm install -g serve
EXPOSE 3010

CMD [ "npm", "run", "start"]