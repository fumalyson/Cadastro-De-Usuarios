FROM node:alpine as
WORKDIR /usr
COPY package.json .
RUN npm install
COPY . .
CMD npm start