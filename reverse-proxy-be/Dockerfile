# FROM node:alpine
# WORKDIR /app
# RUN pwd
# RUN ls -la
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD [ "node", "server.js" ]


# Stage 1: Build Stage
FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

COPY . .

# Stage 2: Production Stage
FROM node:alpine AS production

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Install only production dependencies using npm ci
RUN npm ci --only=production

EXPOSE 3000

CMD [ "node", "server.js" ]
