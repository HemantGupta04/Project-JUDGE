FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache g++ 
RUN npm install 
COPY . .
EXPOSE 4000
CMD [ "node","index.js" ]
