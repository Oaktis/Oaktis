# Oaktis CLI Docker Image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace configuration
COPY package.json ./
COPY packages/js-sdk/package.json ./packages/js-sdk/
COPY apps/cli/package.json ./apps/cli/

# Install dependencies
RUN npm install

# Copy source code
COPY packages/js-sdk ./packages/js-sdk
COPY apps/cli ./apps/cli

# Build packages
WORKDIR /app/packages/js-sdk
RUN npm run build

WORKDIR /app/apps/cli
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy built artifacts and dependencies
COPY --from=builder /app/packages/js-sdk/dist ./packages/js-sdk/dist
COPY --from=builder /app/packages/js-sdk/package.json ./packages/js-sdk/
COPY --from=builder /app/apps/cli/dist ./apps/cli/dist
COPY --from=builder /app/apps/cli/package.json ./apps/cli/
COPY --from=builder /app/package.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Create symlink for CLI
RUN npm link ./apps/cli

# Set environment
ENV NODE_ENV=production

# Default command
ENTRYPOINT ["oaktis"]
CMD ["--help"]
