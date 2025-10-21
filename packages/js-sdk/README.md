# @oaktis/sdk

> **🔗 Try Oaktis → [https://oaktis.com](https://oaktis.com/?utm_source=npm&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=readme)**

Official JavaScript/TypeScript SDK for Oaktis - AI-powered image & video generation.

[![npm version](https://img.shields.io/npm/v/@oaktis/sdk)](https://www.npmjs.com/package/@oaktis/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎬 **Video Generation** - Create AI-powered videos from text prompts
- 🖼️ **Image Generation** - Generate images with advanced AI models
- 📝 **TypeScript Support** - Full type definitions included
- 🔄 **Job Management** - Track generation progress with status polling
- ⚡ **Modern API** - Promise-based with async/await support
- 🌐 **Universal** - Works in Node.js and browsers

## Installation

```bash
npm install @oaktis/sdk
```

Or with yarn:

```bash
yarn add @oaktis/sdk
```

Or with pnpm:

```bash
pnpm add @oaktis/sdk
```

## Quick Start

### Video Generation

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

console.log('Job ID:', job.id);

// Check job status
const status = await client.video.getStatus(job.id);
console.log('Status:', status.status);
console.log('Progress:', status.progress);

// Get completed job with video URL
if (status.status === 'completed') {
  const completedJob = await client.video.getJob(job.id);
  console.log('Video URL:', completedJob.videoUrl);
}
```

### Image Generation

```typescript
import { OaktisClient } from '@oaktis/sdk';

const client = new OaktisClient({
  apiKey: process.env.OAKTIS_API_KEY!
});

// Generate an image
const job = await client.image.generate({
  prompt: 'a futuristic city at night with neon lights',
  size: '1024x1024',
  n: 1
});

// Get completed job with image URLs
const completedJob = await client.image.getJob(job.id);
console.log('Image URLs:', completedJob.imageUrls);
```

## Configuration

The `OaktisClient` accepts the following configuration options:

```typescript
interface OaktisConfig {
  /** API Key for authentication (required) */
  apiKey: string;

  /** Base URL for the Oaktis API (optional, default: https://api.oaktis.com) */
  baseUrl?: string;

  /** Request timeout in milliseconds (optional, default: 60000) */
  timeout?: number;
}
```

Example with custom configuration:

```typescript
const client = new OaktisClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://custom-api.example.com',
  timeout: 120000 // 2 minutes
});
```

## API Reference

### Video API

#### `client.video.generate(params)`

Generate a video from a text prompt.

**Parameters:**
- `prompt` (string, required) - Text description of the video
- `duration` (number, optional) - Video duration in seconds
- `resolution` ('720p' | '1080p' | '4k', optional) - Video resolution

**Returns:** `Promise<VideoJob>`

#### `client.video.getStatus(jobId)`

Get the status of a video generation job.

**Returns:** `Promise<JobStatus>`

#### `client.video.getJob(jobId)`

Get full details of a video job including the generated video URL.

**Returns:** `Promise<VideoJob>`

### Image API

#### `client.image.generate(params)`

Generate an image from a text prompt.

**Parameters:**
- `prompt` (string, required) - Text description of the image
- `size` ('512x512' | '1024x1024' | '1024x1792' | '1792x1024', optional) - Image size
- `n` (number, optional) - Number of images to generate

**Returns:** `Promise<ImageJob>`

#### `client.image.getStatus(jobId)`

Get the status of an image generation job.

**Returns:** `Promise<JobStatus>`

#### `client.image.getJob(jobId)`

Get full details of an image job including generated image URLs.

**Returns:** `Promise<ImageJob>`

## Error Handling

The SDK throws `APIError` objects with the following structure:

```typescript
interface APIError {
  code: string;
  message: string;
  status: number;
  details?: any;
}
```

Example error handling:

```typescript
try {
  const job = await client.video.generate({ prompt: 'test' });
} catch (error) {
  if (error.code === 'UNAUTHORIZED') {
    console.error('Invalid API key');
  } else if (error.code === 'TIMEOUT') {
    console.error('Request timed out');
  } else {
    console.error('Error:', error.message);
  }
}
```

## TypeScript Support

This package includes TypeScript type definitions. All types are exported from the main entry point:

```typescript
import type {
  OaktisConfig,
  VideoGenerateParams,
  ImageGenerateParams,
  VideoJob,
  ImageJob,
  JobStatus,
  APIError
} from '@oaktis/sdk';
```

## Links

- 🌐 **Website**: [https://oaktis.com](https://oaktis.com)
- 📚 **Documentation**: [https://docs.oaktis.com](https://docs.oaktis.com)
- 🐙 **GitHub**: [https://github.com/oaktis/oaktis-sdk](https://github.com/oaktis/oaktis-sdk)
- 🐛 **Issues**: [https://github.com/oaktis/oaktis-sdk/issues](https://github.com/oaktis/oaktis-sdk/issues)

## License

MIT © Oaktis

---

**Need an API key?** Get started at [oaktis.com](https://oaktis.com/?utm_source=npm&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=readme-footer)
