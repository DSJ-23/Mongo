FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker-compose up --build -d
# to build first and them run in detached mode
# you only have to build once you change something