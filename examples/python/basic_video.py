"""
Basic Video Generation Example

This example demonstrates how to generate a video using the Oaktis SDK.
"""

import asyncio
import os
from oaktis import OaktisClient, VideoGenerateParams


async def main():
    # Initialize the client with your API key
    client = OaktisClient(api_key=os.getenv("OAKTIS_API_KEY"))

    try:
        print("🎬 Generating video...\n")

        # Generate a video
        job = await client.video.generate(
            VideoGenerateParams(
                prompt="a cat surfing on ocean waves at sunset",
                duration=5,
                resolution="1080p",
            )
        )

        print("✅ Job submitted successfully!")
        print(f"Job ID: {job.id}")
        print(f"Status: {job.status}\n")

        # Poll for completion
        print("⏳ Waiting for completion...\n")

        while True:
            status = await client.video.get_status(job.id)

            if status.progress is not None:
                print(f"Progress: {status.progress}%")

            if status.status in ["completed", "failed"]:
                break

            await asyncio.sleep(2)

        if status.status == "completed":
            result = await client.video.get_job(job.id)
            print("\n✅ Video generated successfully!")
            print(f"Video URL: {result.video_url}")
            if result.thumbnail_url:
                print(f"Thumbnail: {result.thumbnail_url}")
        else:
            print(f"\n❌ Video generation failed: {status.error}")
            exit(1)

    except Exception as e:
        print(f"Error: {str(e)}")
        exit(1)
    finally:
        await client.close()


if __name__ == "__main__":
    asyncio.run(main())
