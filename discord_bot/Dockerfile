FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then node src/bot.js; else nodemon src/bot.js; fi"]