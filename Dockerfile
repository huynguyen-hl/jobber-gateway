FROM node:21-alpine3.18 as builder
WORKDIR /app

COPY package.json .

COPY .npmrc .

RUN npm install && npm i -g nodemon

COPY tsconfig.json .

COPY src .

RUN npm install -g npm@latest
RUN npm ci && npm run build


FROM node:21-alpine3.18

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json .
COPY .npmrc .
COPY tsconfig.json .

RUN RUN npm install -g pm2 npm@latest
RUN npm ci --production

COPY --from=builder app/build build

EXPOSE 4000

CMD [ "npm", "start" ]