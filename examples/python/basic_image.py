"""
Basic Image Generation Example

This example demonstrates how to generate images using the Oaktis SDK.
"""

import asyncio
import os
from oaktis import OaktisClient, ImageGenerateParams


async def main():
    # Initialize the client with your API key
    client = OaktisClient(api_key=os.getenv("OAKTIS_API_KEY"))

    try:
        print("🖼️  Generating images...\n")

        # Generate images
        job = await client.image.generate(
            ImageGenerateParams(
                prompt="a futuristic city at night with neon lights",
                size="1024x1024",
                n=2,
            )
        )

        print("✅ Job submitted successfully!")
        print(f"Job ID: {job.id}")
        print(f"Status: {job.status}\n")

        # Poll for completion
        print("⏳ Waiting for completion...\n")

        while True:
            status = await client.image.get_status(job.id)

            if status.progress is not None:
                print(f"Progress: {status.progress}%")

            if status.status in ["completed", "failed"]:
                break

            await asyncio.sleep(2)

        if status.status == "completed":
            result = await client.image.get_job(job.id)
            print("\n✅ Images generated successfully!")
            if result.image_urls and len(result.image_urls) > 0:
                print(f"\nGenerated {len(result.image_urls)} image(s):")
                for i, url in enumerate(result.image_urls, 1):
                    print(f"  {i}. {url}")
        else:
            print(f"\n❌ Image generation failed: {status.error}")
            exit(1)

    except Exception as e:
        print(f"Error: {str(e)}")
        exit(1)
    finally:
        await client.close()


if __name__ == "__main__":
    asyncio.run(main())
