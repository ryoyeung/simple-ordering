FROM node:12.14

RUN mkdir -p /usr/src/simple-ordering

WORKDIR /usr/src/simple-ordering

COPY . /usr/src/simple-ordering/
RUN chmod +x /usr/src/simple-ordering/wait-for-it.sh

RUN npm install

RUN npm run build

CMD ./wait-for-it.sh -t 30 db:3306 -- npm run migration:prod && npm start