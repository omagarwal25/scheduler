FROM node:alpine as prod

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN apk add python3 make gcc g++

RUN npm i

COPY ./ ./

RUN npm run build

CMD ["npm", "run", "start:prod"]

FROM prod as dev

CMD [ "npm", "run", "start:dev" ]