# Oaktis CLI Docker Image

> **🔗 Try Oaktis → [https://oaktis.com](https://oaktis.com/?utm_source=dockerhub&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=description)**

Official Docker image for Oaktis command-line tools.

## Quick Start

```bash
docker pull oaktis/cli:latest

# Generate a video
docker run -e OAKTIS_API_KEY=your-api-key oaktis/cli video "a cat surfing"

# Generate an image
docker run -e OAKTIS_API_KEY=your-api-key oaktis/cli image "a futuristic city"
```

## Usage

### Using Environment Variables

```bash
docker run -e OAKTIS_API_KEY=your-api-key oaktis/cli video "a mountain landscape" --duration 10
```

### Using .env File

```bash
# Create .env file
echo "OAKTIS_API_KEY=your-api-key" > .env

# Run with env file
docker run --env-file .env oaktis/cli video "a cat surfing"
```

### Interactive Mode

```bash
# Run in interactive mode
docker run -it -e OAKTIS_API_KEY=your-api-key oaktis/cli

# Or with shell
docker run -it --entrypoint /bin/sh oaktis/cli
```

## Commands

All CLI commands are available in the Docker image:

```bash
# Video generation
docker run -e OAKTIS_API_KEY=xxx oaktis/cli video "prompt" [options]

# Image generation
docker run -e OAKTIS_API_KEY=xxx oaktis/cli image "prompt" [options]

# Check status
docker run -e OAKTIS_API_KEY=xxx oaktis/cli status <jobId> --type video

# Get result
docker run -e OAKTIS_API_KEY=xxx oaktis/cli get <jobId> --type video

# Show help
docker run oaktis/cli --help
```

## Examples

### Generate Video with Options

```bash
docker run -e OAKTIS_API_KEY=your-api-key \
  oaktis/cli video "a cat surfing at sunset" \
  --duration 10 \
  --resolution 1080p
```

### Generate Multiple Images

```bash
docker run -e OAKTIS_API_KEY=your-api-key \
  oaktis/cli image "abstract art" \
  --size 1024x1024 \
  --number 3
```

### Submit Job Without Waiting

```bash
docker run -e OAKTIS_API_KEY=your-api-key \
  oaktis/cli video "a mountain landscape" \
  --no-wait
```

## Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  oaktis:
    image: oaktis/cli:latest
    environment:
      - OAKTIS_API_KEY=${OAKTIS_API_KEY}
    command: video "a cat surfing"
```

Run with:

```bash
OAKTIS_API_KEY=your-api-key docker-compose up
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Generate video with Oaktis
  run: |
    docker run -e OAKTIS_API_KEY=${{ secrets.OAKTIS_API_KEY }} \
      oaktis/cli video "automated video generation" --no-wait
```

### GitLab CI

```yaml
generate_video:
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker pull oaktis/cli:latest
    - docker run -e OAKTIS_API_KEY=$OAKTIS_API_KEY oaktis/cli video "test video"
```

## Building the Image

### From Source

```bash
# Clone the repository
git clone https://github.com/Oaktis/Oaktis
cd oaktis-sdk

# Build the image
docker build -t oaktis/cli:latest -f docker/oaktis-cli/Dockerfile .

# Test the image
docker run oaktis/cli:latest --version
```

### Multi-platform Build

```bash
docker buildx create --use
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t oaktis/cli:latest \
  -f docker/oaktis-cli/Dockerfile \
  --push .
```

## Image Tags

- `latest` - Latest stable release
- `0.1.0`, `0.2.0`, etc. - Specific version tags
- `main` - Latest commit from main branch (unstable)

## Image Details

- **Base**: `node:20-alpine`
- **Size**: ~50MB (compressed)
- **Entrypoint**: `oaktis` CLI
- **User**: `node` (non-root)

## Environment Variables

- `OAKTIS_API_KEY` (required) - Your Oaktis API key
- `OAKTIS_BASE_URL` (optional) - Custom API base URL
- `NODE_ENV` - Set to `production` by default

## Volumes

You can mount volumes to save outputs or load configuration:

```bash
docker run \
  -e OAKTIS_API_KEY=your-api-key \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/output:/app/output \
  oaktis/cli video "a cat surfing"
```

## Security

This image runs as a non-root user (`node`) for better security. The API key is passed via environment variables and not baked into the image.

## Troubleshooting

### Permission Issues

```bash
# Run with specific user
docker run --user $(id -u):$(id -g) \
  -e OAKTIS_API_KEY=your-api-key \
  oaktis/cli video "test"
```

### Network Issues

```bash
# Use host network
docker run --network host \
  -e OAKTIS_API_KEY=your-api-key \
  oaktis/cli video "test"
```

### Debug Mode

```bash
# Run with shell to debug
docker run -it --entrypoint /bin/sh \
  -e OAKTIS_API_KEY=your-api-key \
  oaktis/cli
```

## Links

- 🌐 **Website**: [https://oaktis.com](https://oaktis.com)
- 📚 **Documentation**: [https://docs.oaktis.com](https://docs.oaktis.com)
- 🐙 **GitHub**: [https://github.com/Oaktis/Oaktis](https://github.com/Oaktis/Oaktis)
- 📦 **npm Package**: [@oaktis/sdk](https://www.npmjs.com/package/@oaktis/sdk)
- 🐍 **PyPI Package**: [oaktis](https://pypi.org/project/oaktis/)
- 🐛 **Issues**: [https://github.com/Oaktis/Oaktis/issues](https://github.com/Oaktis/Oaktis/issues)

## License

MIT © Oaktis

---

**Need an API key?** Get started at [oaktis.com](https://oaktis.com/?utm_source=dockerhub&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=readme-footer)
