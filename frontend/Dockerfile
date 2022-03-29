FROM node:latest

COPY . /app
WORKDIR /app

RUN yarn
RUN yarn build

CMD node index
