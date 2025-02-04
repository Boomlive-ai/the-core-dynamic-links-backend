# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the port (make sure this matches Coolify's setting)
EXPOSE 3000

# Start the application using npm
CMD ["npm", "start"]
