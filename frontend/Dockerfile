FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run build; else npm start; fi"]