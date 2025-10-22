# Quick Start Guide

Get started with Oaktis in under 5 minutes.

## 1. Get Your API Key

First, sign up and get your API key at:

👉 **[oaktis.com](https://oaktis.com/?utm_source=docs&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=quickstart)**

## 2. Choose Your SDK

=== "JavaScript/TypeScript"

    Install the SDK:

    ```bash
    npm install @ververv/oaktis-sdk
    ```

    Create a file `example.ts`:

    ```typescript
    import { OaktisClient } from '@ververv/oaktis-sdk';

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
    console.log('Status:', job.status);

    // Wait for completion
    let status = await client.video.getStatus(job.id);
    while (status.status === 'pending' || status.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 2000));
      status = await client.video.getStatus(job.id);
    }

    // Get result
    const result = await client.video.getJob(job.id);
    console.log('Video URL:', result.videoUrl);
    ```

    Run it:

    ```bash
    export OAKTIS_API_KEY=your-api-key
    npx tsx example.ts
    ```

=== "Python"

    Install the SDK:

    ```bash
    pip install oaktis
    ```

    Create a file `example.py`:

    ```python
    import asyncio
    import os
    from oaktis import OaktisClient, VideoGenerateParams

    async def main():
        client = OaktisClient(api_key=os.getenv("OAKTIS_API_KEY"))

        # Generate a video
        job = await client.video.generate(
            VideoGenerateParams(
                prompt="a cat surfing on ocean waves at sunset",
                duration=5,
                resolution="1080p"
            )
        )

        print(f"Job ID: {job.id}")
        print(f"Status: {job.status}")

        # Wait for completion
        while True:
            status = await client.video.get_status(job.id)
            if status.status in ["completed", "failed"]:
                break
            await asyncio.sleep(2)

        # Get result
        result = await client.video.get_job(job.id)
        print(f"Video URL: {result.video_url}")

        await client.close()

    asyncio.run(main())
    ```

    Run it:

    ```bash
    export OAKTIS_API_KEY=your-api-key
    python example.py
    ```

=== "CLI"

    Install the CLI:

    ```bash
    npm install -g oaktis-cli
    ```

    Set your API key:

    ```bash
    export OAKTIS_API_KEY=your-api-key
    ```

    Generate a video:

    ```bash
    oaktis video "a cat surfing on ocean waves at sunset" \
      --duration 5 \
      --resolution 1080p
    ```

    The CLI will automatically wait for completion and display the result.

=== "Docker"

    Pull the image:

    ```bash
    docker pull oaktis/cli:latest
    ```

    Run a command:

    ```bash
    docker run -e OAKTIS_API_KEY=your-api-key \
      oaktis/cli video "a cat surfing on ocean waves at sunset"
    ```

## 3. Try Image Generation

=== "JavaScript/TypeScript"

    ```typescript
    const job = await client.image.generate({
      prompt: 'a futuristic city at night with neon lights',
      size: '1024x1024',
      n: 2
    });

    const result = await client.image.getJob(job.id);
    console.log('Image URLs:', result.imageUrls);
    ```

=== "Python"

    ```python
    from oaktis import ImageGenerateParams

    job = await client.image.generate(
        ImageGenerateParams(
            prompt="a futuristic city at night with neon lights",
            size="1024x1024",
            n=2
        )
    )

    result = await client.image.get_job(job.id)
    print(f"Image URLs: {result.image_urls}")
    ```

=== "CLI"

    ```bash
    oaktis image "a futuristic city at night with neon lights" \
      --size 1024x1024 \
      --number 2
    ```

=== "Docker"

    ```bash
    docker run -e OAKTIS_API_KEY=your-api-key \
      oaktis/cli image "a futuristic city at night"
    ```

## Next Steps

- 📖 [Installation Guide](installation.md) - Detailed installation instructions
- 🔑 [Authentication](authentication.md) - Learn about API key management
- 🔧 [JavaScript SDK](https://github.com/Oaktis/Oaktis/tree/main/packages/js-sdk) - Full JS/TS SDK reference
- 🐍 [Python SDK](https://github.com/Oaktis/Oaktis/tree/main/packages/py-sdk) - Complete Python SDK documentation
- 💻 [CLI Reference](https://github.com/Oaktis/Oaktis/tree/main/apps/cli) - Command-line tool guide

## Common Issues

### API Key Not Set

If you see "API key is required" error:

```bash
# Set the environment variable
export OAKTIS_API_KEY=your-api-key

# Or create a .env file
echo "OAKTIS_API_KEY=your-api-key" > .env
```

### Request Timeout

If requests are timing out, you can increase the timeout:

```typescript
// JavaScript
const client = new OaktisClient({
  apiKey: 'your-api-key',
  timeout: 120000 // 2 minutes
});
```

```python
# Python
client = OaktisClient(
    api_key="your-api-key",
    timeout=120.0  # 2 minutes
)
```

## Getting Help

- 🐛 Report issues: [GitHub Issues](https://github.com/Oaktis/Oaktis/issues)
- 💬 Ask questions: [GitHub Discussions](https://github.com/Oaktis/Oaktis/discussions)
- 📧 Email support: support@oaktis.com
