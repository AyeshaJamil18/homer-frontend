FROM node:13-alpine
EXPOSE 8000
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

ADD . .

CMD ["yarn", "start"]
