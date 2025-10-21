/**
 * Basic Video Generation Example
 *
 * This example demonstrates how to generate a video using the Oaktis SDK.
 */

import { OaktisClient } from '@oaktis/sdk';

async function main() {
  // Initialize the client with your API key
  const client = new OaktisClient({
    apiKey: process.env.OAKTIS_API_KEY!,
  });

  try {
    console.log('🎬 Generating video...\n');

    // Generate a video
    const job = await client.video.generate({
      prompt: 'a cat surfing on ocean waves at sunset',
      duration: 5,
      resolution: '1080p',
    });

    console.log('✅ Job submitted successfully!');
    console.log(`Job ID: ${job.id}`);
    console.log(`Status: ${job.status}\n`);

    // Poll for completion
    console.log('⏳ Waiting for completion...\n');

    let status = await client.video.getStatus(job.id);
    while (status.status === 'pending' || status.status === 'processing') {
      if (status.progress !== undefined) {
        console.log(`Progress: ${status.progress}%`);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      status = await client.video.getStatus(job.id);
    }

    if (status.status === 'completed') {
      const result = await client.video.getJob(job.id);
      console.log('\n✅ Video generated successfully!');
      console.log(`Video URL: ${result.videoUrl}`);
      if (result.thumbnailUrl) {
        console.log(`Thumbnail: ${result.thumbnailUrl}`);
      }
    } else {
      console.error('\n❌ Video generation failed:', status.error);
      process.exit(1);
    }
  } catch (error: any) {
    console.error('Error:', error.message || error);
    process.exit(1);
  }
}

main();
