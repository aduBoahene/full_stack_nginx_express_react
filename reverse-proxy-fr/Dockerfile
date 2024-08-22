

# First Stage: Install dependencies and build the app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Second Stage: Serve the built app
FROM node:18-alpine

# Set the working directory for the final stage
WORKDIR /app

# Copy only the necessary files from the first stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "run", "start"]