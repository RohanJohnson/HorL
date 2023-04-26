# FROM node 
# WORKDIR /app 
# COPY package.json . 
# RUN npm i COPY . .
# CMD ["npm", "run", "dev"]


FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install vite -g

RUN npm install --production

COPY . .

CMD ["npm", "run", "build"]