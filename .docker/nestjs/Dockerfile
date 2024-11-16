FROM node:22.11.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ../nestjs/package.json /app

RUN npm install

# Bundle app source
COPY ../nestjs/ /app

EXPOSE 3004

CMD [ "npm", "run", "start:dev" ]