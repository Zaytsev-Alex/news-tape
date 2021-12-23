FROM node:16.3.0
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
CMD ["npm", "run", "start"]
