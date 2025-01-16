# Stage 1: Build the project
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy application files
COPY . ./

# Build the React app
RUN yarn build

# Stage 2: Serve the app using nginx
FROM nginx:alpine

# Copy built app from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
