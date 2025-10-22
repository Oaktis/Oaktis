# Oaktis SDK

> **🔗 Try Oaktis → [https://oaktis.com](https://oaktis.com/?utm_source=github&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=repo-readme)**

Official SDKs and tools for Oaktis - AI-powered image & video generation platform.

[![npm version](https://img.shields.io/npm/v/@oaktis/sdk)](https://www.npmjs.com/package/@oaktis/sdk)
[![PyPI version](https://img.shields.io/pypi/v/oaktis)](https://pypi.org/project/oaktis/)
[![Docker Pulls](https://img.shields.io/docker/pulls/oaktis/cli)](https://hub.docker.com/r/oaktis/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/oaktis/oaktis-sdk?style=social)](https://github.com/Oaktis/Oaktis)

## ✨ Features

- 🎬 **Video Generation** - Create AI-powered videos from text prompts
- 🖼️ **Image Generation** - Generate images with advanced AI models
- 📦 **Multiple Packages** - JavaScript, Python, CLI, and Docker support
- 📝 **Type-Safe** - Full TypeScript and Python type definitions
- ⚡ **Async Support** - Built-in async/await for both JS and Python
- 🔄 **Job Management** - Track generation progress with status polling
- 🌐 **Universal** - Works in Node.js, browsers, and server environments

## 📦 Packages

This monorepo contains multiple packages for different platforms:

| Package | Platform | Version | Installation |
|---------|----------|---------|--------------|
| [@oaktis/sdk](https://www.npmjs.com/package/@oaktis/sdk) | npm | [![npm](https://img.shields.io/npm/v/@oaktis/sdk)](https://www.npmjs.com/package/@oaktis/sdk) | `npm install @oaktis/sdk` |
| [oaktis](https://pypi.org/project/oaktis/) | PyPI | [![PyPI](https://img.shields.io/pypi/v/oaktis)](https://pypi.org/project/oaktis/) | `pip install oaktis` |
| [oaktis-cli](https://www.npmjs.com/package/oaktis-cli) | npm | [![npm](https://img.shields.io/npm/v/oaktis-cli)](https://www.npmjs.com/package/oaktis-cli) | `npm install -g oaktis-cli` |
| [oaktis/cli](https://hub.docker.com/r/oaktis/cli) | Docker | [![Docker](https://img.shields.io/docker/pulls/oaktis/cli)](https://hub.docker.com/r/oaktis/cli) | `docker pull oaktis/cli` |

## 🚀 Quick Start

### JavaScript/TypeScript

```bash
npm install @oaktis/sdk
```

```typescript
import { OaktisClient } from '@oaktis/sdk';

const client = new OaktisClient({
  apiKey: process.env.OAKTIS_API_KEY!
});

// Generate a video
const job = await client.video.generate({
  prompt: 'a cat surfing on ocean waves at sunset',
  duration: 5,
  resolution: '1080p'
});

console.log('Video URL:', job.videoUrl);
```

[📖 Full JavaScript Documentation →](packages/js-sdk/README.md)

### Python

```bash
pip install oaktis
```

```python
import asyncio
from oaktis import OaktisClient, VideoGenerateParams

async def main():
    client = OaktisClient(api_key="your-api-key")

    job = await client.video.generate(
        VideoGenerateParams(
            prompt="a cat surfing on ocean waves at sunset",
            duration=5,
            resolution="1080p"
        )
    )

    print(f"Video URL: {job.video_url}")
    await client.close()

asyncio.run(main())
```

[📖 Full Python Documentation →](packages/py-sdk/README.md)

### CLI

```bash
npm install -g oaktis-cli

# Set your API key
export OAKTIS_API_KEY=your-api-key

# Generate a video
oaktis video "a cat surfing on ocean waves" --duration 5 --resolution 1080p
```

[📖 Full CLI Documentation →](apps/cli/README.md)

### Docker

```bash
docker pull oaktis/cli:latest

docker run -e OAKTIS_API_KEY=your-api-key \
  oaktis/cli video "a cat surfing on ocean waves"
```

[📖 Full Docker Documentation →](docker/oaktis-cli/README.md)

## 📚 Documentation

- 🏠 **[Main Documentation](https://docs.oaktis.com)** - Complete guide and API reference
- 🎯 **[Quick Start](https://docs.oaktis.com/getting-started/quickstart/)** - Get started in 5 minutes
- 🔧 **[JavaScript SDK](https://docs.oaktis.com/js-sdk/overview/)** - Full JS/TS reference
- 🐍 **[Python SDK](https://docs.oaktis.com/py-sdk/overview/)** - Complete Python guide
- 💻 **[CLI Reference](https://docs.oaktis.com/cli/overview/)** - Command-line tool guide
- 🎓 **[Examples](examples/)** - Code examples for all platforms
- 📓 **[Jupyter Notebooks](notebooks/)** - Interactive tutorials

## 🌐 Live Demo

Try Oaktis in your browser with our interactive demo on HuggingFace:

👉 **[HuggingFace Space Demo](https://huggingface.co/spaces/ververv/oaktis)** - No installation required!

## 🔑 Getting Your API Key

To use Oaktis, you need an API key. Get yours at:

👉 **[oaktis.com/signup](https://oaktis.com/?utm_source=github&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=repo-apikey)**

## 📁 Repository Structure

```
oaktis-sdk/
├── packages/
│   ├── js-sdk/          # JavaScript/TypeScript SDK
│   └── py-sdk/          # Python SDK
├── apps/
│   ├── cli/             # Command-line tool
│   └── hf-space/        # HuggingFace Gradio demo
├── docker/
│   └── oaktis-cli/      # Docker image configuration
├── docs/                # MkDocs documentation site
├── examples/            # Code examples (JS & Python)
├── notebooks/           # Jupyter notebooks
└── .github/workflows/   # CI/CD automation
```

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/Oaktis/Oaktis
cd oaktis-sdk

# Install dependencies
npm install

# Build all packages
npm run build
```

### Testing

```bash
# JavaScript SDK
cd packages/js-sdk
npm test

# Python SDK
cd packages/py-sdk
pytest
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- 🌐 **Website**: [oaktis.com](https://oaktis.com/?utm_source=github&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=repo-links)
- 📚 **Documentation**: [docs.oaktis.com](https://docs.oaktis.com)
- 📦 **npm Package**: [@oaktis/sdk](https://www.npmjs.com/package/@oaktis/sdk)
- 🐍 **PyPI Package**: [oaktis](https://pypi.org/project/oaktis/)
- 🐳 **Docker Hub**: [oaktis/cli](https://hub.docker.com/r/oaktis/cli)
- 🤗 **HuggingFace**: [ververv/oaktis](https://huggingface.co/spaces/ververv/oaktis)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Oaktis/Oaktis/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Oaktis/Oaktis/discussions)

## 🌟 Show Your Support

If you find Oaktis useful, please consider:

- ⭐ Starring this repository
- 🐦 Sharing on social media
- 📝 Writing a blog post or tutorial
- 🤝 Contributing to the project

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/oaktis/oaktis-sdk?style=social)
![GitHub forks](https://img.shields.io/github/forks/oaktis/oaktis-sdk?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/oaktis/oaktis-sdk?style=social)

---

**Made with ❤️ by the Oaktis team**

Get started at [oaktis.com](https://oaktis.com/?utm_source=github&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=repo-footer)
