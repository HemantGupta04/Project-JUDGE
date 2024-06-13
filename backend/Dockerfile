
ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache g++ 
RUN npm install 
COPY . .
EXPOSE 4000
CMD [ "node","index.js" ]
