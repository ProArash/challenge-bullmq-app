# Dockerfile
FROM node:jod-alpine3.23 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:jod-alpine3.23

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["node", "dist/main.js"]