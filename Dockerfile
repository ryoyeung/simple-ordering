FROM node:12.14

RUN mkdir -p /usr/src/simple-ordering

WORKDIR /usr/src/simple-ordering

COPY dist /usr/src/simple-ordering/dist
COPY package.json /usr/src/simple-ordering/
COPY .env /usr/src/simple-ordering/
COPY wait-for-it.sh /usr/src/simple-ordering/
RUN chmod +x /usr/src/simple-ordering/wait-for-it.sh

RUN npm install

CMD ./wait-for-it.sh -t 30 db:3306 -- npm run migration:prod && npm start