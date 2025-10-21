# oaktis-cli

> **🔗 Try Oaktis → [https://oaktis.com](https://oaktis.com/?utm_source=npm&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=cli-readme)**

Command-line tool for Oaktis - AI-powered image & video generation.

## Installation

### Global Installation

```bash
npm install -g oaktis-cli
```

Or with yarn:

```bash
yarn global add oaktis-cli
```

Or with pnpm:

```bash
pnpm add -g oaktis-cli
```

### Local Usage (npx)

```bash
npx oaktis-cli video "a cat surfing"
```

## Setup

Before using the CLI, you need to set your Oaktis API key:

```bash
export OAKTIS_API_KEY=your-api-key
```

Or create a `.env` file in your working directory:

```env
OAKTIS_API_KEY=your-api-key
```

**Get your API key**: [oaktis.com](https://oaktis.com/?utm_source=npm&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=cli-apikey)

## Usage

### Generate Video

```bash
# Basic usage
oaktis video "a cat surfing on ocean waves"

# With options
oaktis video "a cat surfing" --duration 10 --resolution 1080p

# Submit without waiting
oaktis video "a cat surfing" --no-wait
```

**Options:**
- `-d, --duration <seconds>` - Video duration in seconds
- `-r, --resolution <res>` - Video resolution (720p, 1080p, 4k)
- `--no-wait` - Submit job and return immediately

### Generate Image

```bash
# Basic usage
oaktis image "a futuristic city at night"

# With options
oaktis image "a city" --size 1024x1024 --number 2

# Submit without waiting
oaktis image "a city" --no-wait
```

**Options:**
- `-s, --size <size>` - Image size (512x512, 1024x1024, 1024x1792, 1792x1024)
- `-n, --number <n>` - Number of images to generate (default: 1)
- `--no-wait` - Submit job and return immediately

### Check Job Status

```bash
# Check video job status
oaktis status job_123abc --type video

# Check image job status
oaktis status job_456def --type image
```

**Options:**
- `-t, --type <type>` - Job type (video or image, default: video)

### Get Job Result

```bash
# Get completed video job
oaktis get job_123abc --type video

# Get completed image job
oaktis get job_456def --type image
```

**Options:**
- `-t, --type <type>` - Job type (video or image, default: video)

## Examples

### Complete Video Generation Workflow

```bash
# 1. Generate video and wait for completion
oaktis video "a cat surfing at sunset" --duration 5 --resolution 1080p

# Output:
# ✔ Job submitted successfully!
# Job ID: job_123abc
# Status: pending
#
# ✔ Generation completed!
#
# ✓ Video URL: https://cdn.oaktis.com/videos/job_123abc.mp4
# ✓ Thumbnail: https://cdn.oaktis.com/thumbnails/job_123abc.jpg
```

### Complete Image Generation Workflow

```bash
# 1. Generate multiple images
oaktis image "abstract art" --size 1024x1024 --number 3

# Output:
# ✔ Job submitted successfully!
# Job ID: job_456def
# Status: pending
#
# ✔ Generation completed!
#
# ✓ Generated 3 image(s):
#   1. https://cdn.oaktis.com/images/job_456def_1.png
#   2. https://cdn.oaktis.com/images/job_456def_2.png
#   3. https://cdn.oaktis.com/images/job_456def_3.png
```

### Async Workflow (No Wait)

```bash
# 1. Submit job without waiting
oaktis video "a mountain landscape" --no-wait

# Output:
# ✔ Job submitted successfully!
# Job ID: job_789ghi
# Status: pending
#
# Use the following command to check status:
#   oaktis status job_789ghi --type video

# 2. Check status later
oaktis status job_789ghi --type video

# 3. Get result when completed
oaktis get job_789ghi --type video
```

## Environment Variables

- `OAKTIS_API_KEY` (required) - Your Oaktis API key
- `OAKTIS_BASE_URL` (optional) - Custom API base URL

## Error Handling

The CLI provides helpful error messages:

```bash
# Missing API key
$ oaktis video "test"
Error: OAKTIS_API_KEY environment variable is required

Set your API key:
  export OAKTIS_API_KEY=your-api-key

Or create a .env file with:
  OAKTIS_API_KEY=your-api-key

# Invalid parameters
$ oaktis video "test" --resolution 8k
Error: Invalid resolution. Supported: 720p, 1080p, 4k

# Job failed
$ oaktis status job_xxx
✖ Generation failed: Insufficient credits
```

## Shell Completion

### Bash

Add to your `~/.bashrc`:

```bash
eval "$(oaktis --completion bash)"
```

### Zsh

Add to your `~/.zshrc`:

```bash
eval "$(oaktis --completion zsh)"
```

## Links

- 🌐 **Website**: [https://oaktis.com](https://oaktis.com)
- 📚 **Documentation**: [https://docs.oaktis.com](https://docs.oaktis.com)
- 🐙 **GitHub**: [https://github.com/oaktis/oaktis-sdk](https://github.com/oaktis/oaktis-sdk)
- 📦 **npm Package**: [@oaktis/sdk](https://www.npmjs.com/package/@oaktis/sdk)
- 🐛 **Issues**: [https://github.com/oaktis/oaktis-sdk/issues](https://github.com/oaktis/oaktis-sdk/issues)

## License

MIT © Oaktis

---

**Need an API key?** Get started at [oaktis.com](https://oaktis.com/?utm_source=npm&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=cli-footer)
