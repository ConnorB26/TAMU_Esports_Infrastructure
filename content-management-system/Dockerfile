# build stage
FROM node:16-alpine as build

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

WORKDIR /app

COPY package.json package-lock.json ./

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "production" ] ; then npm install --production; else npm install ; fi
RUN npm install --platform=linuxmusl --arch=x64 sharp

COPY . .

RUN npm run build

# production stage
FROM node:16-alpine as production

# Installing libvips-dev for sharp Compatibility
RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=build /app ./

EXPOSE 1337

CMD if [ "$NODE_ENV" = "production" ] ; then npm run start ; else npm run develop ; fi