---
title: Oaktis AI Demo
emoji: 🎬
colorFrom: blue
colorTo: purple
sdk: gradio
sdk_version: 4.0.0
app_file: app.py
pinned: false
---

# Oaktis AI Demo

> **🔗 Try Oaktis → [https://oaktis.com](https://oaktis.com/?utm_source=huggingface&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=space-card)**

Interactive demo for Oaktis - AI-powered image & video generation.

## Features

- 🎬 **Video Generation** - Create videos from text prompts
- 🖼️ **Image Generation** - Generate images with AI
- ⚡ **Real-time Demo** - Try the API instantly
- 📝 **Examples Included** - Pre-filled prompts to get started

## Setup

This Space requires an `OAKTIS_API_KEY` environment variable to be configured:

1. Go to Space Settings → Variables
2. Add a new secret: `OAKTIS_API_KEY` with your API key
3. Restart the Space

**Get your API key**: [oaktis.com](https://oaktis.com/?utm_source=huggingface&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=space-setup)

## Usage

### Video Generation

1. Enter a text prompt describing your video
2. Choose duration and resolution
3. Click "Generate Video"
4. Get your job ID and track the status

### Image Generation

1. Enter a text prompt describing your image
2. Select size and number of images
3. Click "Generate Image"
4. Get your job ID and retrieve results

## Links

- 🌐 **Website**: [https://oaktis.com](https://oaktis.com)
- 📚 **Documentation**: [https://docs.oaktis.com](https://docs.oaktis.com)
- 🐙 **GitHub**: [https://github.com/oaktis/oaktis-sdk](https://github.com/oaktis/oaktis-sdk)
- 📦 **npm Package**: [@oaktis/sdk](https://www.npmjs.com/package/@oaktis/sdk)
- 🐍 **PyPI Package**: [oaktis](https://pypi.org/project/oaktis/)

## Development

### Local Testing

```bash
# Install dependencies
pip install -r requirements.txt

# Set API key
export OAKTIS_API_KEY=your-api-key

# Run the app
python app.py
```

### Deploy to HuggingFace

This Space can be deployed via:

1. **Web Interface**: Upload files via HuggingFace Spaces UI
2. **Git Push**: Push to the Space's Git repository
3. **CI/CD**: Automated deployment via GitHub Actions (see main repo)

## Integration

Use the Oaktis SDK in your own applications:

### JavaScript/TypeScript

```bash
npm install @oaktis/sdk
```

```typescript
import { OaktisClient } from '@oaktis/sdk';

const client = new OaktisClient({ apiKey: 'your-api-key' });
const job = await client.video.generate({
  prompt: 'a cat surfing'
});
```

### Python

```bash
pip install oaktis
```

```python
from oaktis import OaktisClient, VideoGenerateParams

client = OaktisClient(api_key="your-api-key")
job = await client.video.generate(
    VideoGenerateParams(prompt="a cat surfing")
)
```

## License

MIT © Oaktis

---

**Need an API key?** Get started at [oaktis.com](https://oaktis.com/?utm_source=huggingface&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=space-footer)
