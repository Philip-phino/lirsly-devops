# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Backend port
EXPOSE 5000

# Start server
CMD ["node","server.js"]