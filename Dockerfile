# Stage 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies & install
COPY package*.json ./
RUN npm install

# Copy source & build
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM node:20-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy build files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose Next.js default port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]