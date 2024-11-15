FROM node:22.11.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ../nextjs/package.json /app

RUN npm install

# Bundle app source
COPY ../nextjs/ /app

EXPOSE 3003

CMD [ "npm", "run", "start" ]