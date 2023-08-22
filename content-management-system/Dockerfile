# Base stage
FROM node:18-alpine as base

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

WORKDIR /app
COPY package.json package-lock.json ./

# Build stage
FROM base as build

# Install sharp separately for the Docker environment
RUN npm install --platform=linux --arch=x64 sharp
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM base as production

RUN npm install
COPY --from=build /app/build ./build

EXPOSE 1337
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start; else npm run develop; fi"]