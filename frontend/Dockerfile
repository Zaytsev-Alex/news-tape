FROM node:16.3.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "run", "next-dev"]
