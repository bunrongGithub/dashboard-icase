# Use the official Node.js image as the base image
FROM node:20-alpine3.19 as BUILD_IMAGE

# Set the working directory inside the container
WORKDIR /app/icase-app

# Copy package.json and package-lock.json or yarn.lock if present
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application using the Vite build command
RUN npm run build

#Here, we are imp the multi-stage build. It greatly reduces our size

FROM node:20-alpine3.19 as PRODUCTION_IMAGE

WORKDIR /app/icase-app

COPY --from=BUILD_IMAGE /app/icase-app/dist/ /app/icase-app/dist/
# Expose the desired port for the Vite preview server

EXPOSE 8080

COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
EXPOSE 8080

# Use Vite's preview mode to serve the application
CMD ["npm", "run", "preview"]

