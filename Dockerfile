FROM node:14-alpine

WORKDIR /home/api

COPY ./src ./src
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .

RUN npm install
RUN npm run test

CMD npm run start