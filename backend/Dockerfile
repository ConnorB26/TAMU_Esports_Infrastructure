FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
EXPOSE 8080

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start:prod; else npm run start:dev; fi"]