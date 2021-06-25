FROM node:14-alpine

WORKDIR /home/app

COPY ./src ./src
COPY ./package.json ./package-lock.json ./tsconfig.json ./tsconfig.build.json ./.env ./ 

RUN npm install
RUN npm run test

CMD npm run start