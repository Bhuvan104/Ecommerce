# Use an official Node.js runtime as the base image
FROM node:20.11.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install
RUN npm i -g sequelize-cli
RUN npm install mysql2
# Copy the rest of the application files
COPY ./models ./models
COPY ./middleware ./middleware
COPY ./migrations ./migrations
COPY ./routes ./routes
COPY ./controllers ./controllers
COPY ./config ./config
COPY app.js .
COPY server.js .
COPY .env . 
# Expose the port your app runs on

ENTRYPOINT ["sh", "-c", "sequelize db:migrate && exec \"$@\"", "--"]

# Default command (can be overridden when running the container)
CMD ["node", "server.js"]
