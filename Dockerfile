# Use an official Node.js runtime as a parent image (Choose a version, e.g., 18 or 20)
# Using '-slim' variant for smaller image size
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Install potrace and necessary dependencies
# Run apt-get update, install potrace, then clean up apt lists to keep image small
RUN apt-get update && \
    apt-get install -y potrace --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies using npm ci for consistency (uses package-lock.json)
# If you don't have package-lock.json, you can use 'npm install'
RUN npm ci --only=production

# Bundle app source inside the Docker image
COPY . .

# Make port 3000 available to the world outside this container (adjust if your server uses a different port)
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime command
CMD [ "node", "server.js" ]
