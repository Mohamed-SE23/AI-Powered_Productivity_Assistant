# Dockerfile (server)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Generate package-lock.json by running npm install
RUN npm install --package-lock-only

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]
