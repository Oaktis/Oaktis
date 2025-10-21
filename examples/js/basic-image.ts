/**
 * Basic Image Generation Example
 *
 * This example demonstrates how to generate images using the Oaktis SDK.
 */

import { OaktisClient } from '@oaktis/sdk';

async function main() {
  // Initialize the client with your API key
  const client = new OaktisClient({
    apiKey: process.env.OAKTIS_API_KEY!,
  });

  try {
    console.log('🖼️  Generating images...\n');

    // Generate images
    const job = await client.image.generate({
      prompt: 'a futuristic city at night with neon lights',
      size: '1024x1024',
      n: 2,
    });

    console.log('✅ Job submitted successfully!');
    console.log(`Job ID: ${job.id}`);
    console.log(`Status: ${job.status}\n`);

    // Poll for completion
    console.log('⏳ Waiting for completion...\n');

    let status = await client.image.getStatus(job.id);
    while (status.status === 'pending' || status.status === 'processing') {
      if (status.progress !== undefined) {
        console.log(`Progress: ${status.progress}%`);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      status = await client.image.getStatus(job.id);
    }

    if (status.status === 'completed') {
      const result = await client.image.getJob(job.id);
      console.log('\n✅ Images generated successfully!');
      if (result.imageUrls && result.imageUrls.length > 0) {
        console.log(`\nGenerated ${result.imageUrls.length} image(s):`);
        result.imageUrls.forEach((url, i) => {
          console.log(`  ${i + 1}. ${url}`);
        });
      }
    } else {
      console.error('\n❌ Image generation failed:', status.error);
      process.exit(1);
    }
  } catch (error: any) {
    console.error('Error:', error.message || error);
    process.exit(1);
  }
}

main();
