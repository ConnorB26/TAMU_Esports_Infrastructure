FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY ../wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then /wait-for.sh my_frontend:80 -- npm run start:prod; else npm run start:dev; fi"]