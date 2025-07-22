# Frontend Dockerfile (React)
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Expose React dev server port
EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]
