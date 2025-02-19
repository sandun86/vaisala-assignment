# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the application's port
EXPOSE 3004

# Start the server
CMD ["npm", "run", "dev"]
