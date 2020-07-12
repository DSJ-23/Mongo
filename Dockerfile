FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

#just to run it without change docker-compose up
# docker-compose up --build -d
# to build first and them run in detached mode
# you only have to build once you change something
# docker kill $(docker ps -q)

#si yo hago el docker-compose up -d whatever y lo corro funcion pero si corro las dos imagenes separadas no funciona?

# docker run -d mongo
# docker run -d -p 8082:3000 web_dev_mongo_app