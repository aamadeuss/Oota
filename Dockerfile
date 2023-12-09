FROM node:21-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm --force install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]