FROM node:18.13.0 

WORKDIR /user/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "src/server.js" ]