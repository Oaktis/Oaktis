# Oaktis CLI Docker Image
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/js-sdk/package.json ./packages/js-sdk/
COPY apps/cli/package.json ./apps/cli/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/js-sdk ./packages/js-sdk
COPY apps/cli ./apps/cli

# Build packages
RUN pnpm --filter=@ververv/oaktis-sdk run build
RUN pnpm --filter=oaktis-cli run build

# Production image
FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/js-sdk/package.json ./packages/js-sdk/
COPY apps/cli/package.json ./apps/cli/

# Copy built artifacts
COPY --from=builder /app/packages/js-sdk/dist ./packages/js-sdk/dist
COPY --from=builder /app/apps/cli/dist ./apps/cli/dist

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Create global link for CLI
RUN pnpm --filter=oaktis-cli link --global

# Set environment
ENV NODE_ENV=production

# Default command
ENTRYPOINT ["oaktis"]
CMD ["--help"]
