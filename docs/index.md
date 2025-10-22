# Oaktis Documentation

> **🔗 Try Oaktis → [https://oaktis.com](https://oaktis.com/?utm_source=docs&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=docs-home)**

Welcome to the official documentation for Oaktis - AI-powered image & video generation platform.

## What is Oaktis?

Oaktis is a powerful API platform that enables developers to create images and videos using advanced AI models. Simply provide a text prompt, and Oaktis generates high-quality visual content for your applications.

## Key Features

- 🎬 **Video Generation** - Create AI-powered videos from text descriptions
- 🖼️ **Image Generation** - Generate images with state-of-the-art AI models
- ⚡ **Fast & Scalable** - Built for production workloads
- 🔧 **Multiple SDKs** - JavaScript, Python, CLI, and Docker support
- 📝 **Type-Safe** - Full TypeScript and Python type definitions
- 🌐 **RESTful API** - Simple HTTP API for any language

## Quick Start

### JavaScript/TypeScript

```bash
npm install @oaktis/sdk
```

```typescript
import { OaktisClient } from '@oaktis/sdk';

const client = new OaktisClient({ apiKey: 'your-api-key' });

// Generate a video
const job = await client.video.generate({
  prompt: 'a cat surfing on ocean waves',
  duration: 5,
  resolution: '1080p'
});

console.log('Video URL:', job.videoUrl);
```

### Python

```bash
pip install oaktis
```

```python
from oaktis import OaktisClient, VideoGenerateParams

client = OaktisClient(api_key="your-api-key")

# Generate a video
job = await client.video.generate(
    VideoGenerateParams(
        prompt="a cat surfing on ocean waves",
        duration=5,
        resolution="1080p"
    )
)

print(f"Video URL: {job.video_url}")
```

### CLI

```bash
npm install -g oaktis-cli

# Generate a video
oaktis video "a cat surfing on ocean waves" --duration 5 --resolution 1080p
```

### Docker

```bash
docker pull oaktis/cli:latest

docker run -e OAKTIS_API_KEY=your-api-key \
  oaktis/cli video "a cat surfing"
```

## Getting Your API Key

To use Oaktis, you'll need an API key. Get started at:

👉 **[oaktis.com](https://oaktis.com/?utm_source=docs&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=docs-apikey)**

## SDK Packages

| Package | Platform | Installation |
|---------|----------|--------------|
| [@oaktis/sdk](https://www.npmjs.com/package/@oaktis/sdk) | npm | `npm install @oaktis/sdk` |
| [oaktis](https://pypi.org/project/oaktis/) | PyPI | `pip install oaktis` |
| [oaktis-cli](https://www.npmjs.com/package/oaktis-cli) | npm | `npm install -g oaktis-cli` |
| [oaktis/cli](https://hub.docker.com/r/oaktis/cli) | Docker | `docker pull oaktis/cli` |

## Examples

### Video Generation

```typescript
// Basic video generation
const job = await client.video.generate({
  prompt: 'a mountain landscape at sunset'
});

// Advanced options
const job = await client.video.generate({
  prompt: 'a futuristic city with flying cars',
  duration: 10,
  resolution: '4k'
});
```

### Image Generation

```typescript
// Generate a single image
const job = await client.image.generate({
  prompt: 'abstract geometric art',
  size: '1024x1024'
});

// Generate multiple images
const job = await client.image.generate({
  prompt: 'serene beach at sunset',
  size: '1024x1024',
  n: 3
});
```

## Next Steps

- 📖 [Quick Start Guide](getting-started/quickstart.md) - Get up and running in minutes
- 🔧 **JavaScript SDK** - See [npm package](https://www.npmjs.com/package/@oaktis/sdk) for full reference
- 🐍 **Python SDK** - See [PyPI package](https://pypi.org/project/oaktis/) for complete documentation
- 💻 **CLI Reference** - See [CLI package](https://www.npmjs.com/package/oaktis-cli) for command-line tool guide
- 🎯 **GitHub** - Visit [repository](https://github.com/oaktis/oaktis-sdk) for examples and source code

## Community & Support

- 🐙 **GitHub**: [github.com/oaktis/oaktis-sdk](https://github.com/oaktis/oaktis-sdk)
- 🐛 **Issues**: [github.com/oaktis/oaktis-sdk/issues](https://github.com/oaktis/oaktis-sdk/issues)
- 💬 **Discussions**: [github.com/oaktis/oaktis-sdk/discussions](https://github.com/oaktis/oaktis-sdk/discussions)
- 🌐 **Website**: [oaktis.com](https://oaktis.com)

## License

All Oaktis SDKs are open source under the MIT License.
