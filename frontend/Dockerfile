FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

COPY ../wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then /wait-for.sh bootswatch_builder:80 -- npm run build; else npm run start; fi"]