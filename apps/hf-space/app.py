"""
Oaktis Gradio Demo
AI-powered image & video generation
"""

import os
import gradio as gr
import httpx
from typing import Optional, Tuple

# Get API key from environment
API_KEY = os.getenv("OAKTIS_API_KEY", "")
BASE_URL = os.getenv("OAKTIS_BASE_URL", "https://api.oaktis.com")


def generate_video(prompt: str, duration: Optional[int], resolution: str) -> Tuple[str, str]:
    """
    Generate a video from a text prompt

    Args:
        prompt: Text description of the video
        duration: Video duration in seconds
        resolution: Video resolution

    Returns:
        Tuple of (status message, video URL or error)
    """
    if not API_KEY:
        return (
            "❌ Error",
            "OAKTIS_API_KEY environment variable is not set. Please configure it in the Space settings.",
        )

    if not prompt or not prompt.strip():
        return ("❌ Error", "Please enter a prompt")

    try:
        params = {"prompt": prompt.strip()}
        if duration:
            params["duration"] = duration
        if resolution:
            params["resolution"] = resolution

        with httpx.Client(timeout=60.0) as client:
            response = client.post(
                f"{BASE_URL}/v1/video/generate",
                json=params,
                headers={
                    "Authorization": f"Bearer {API_KEY}",
                    "Content-Type": "application/json",
                    "X-Oaktis-Ref": "hf-space",
                },
            )

            if response.is_success:
                data = response.json()
                job_id = data.get("id", "N/A")
                status = data.get("status", "unknown")
                return (
                    f"✅ Job Submitted\n\nJob ID: {job_id}\nStatus: {status}",
                    f"Video generation started! Job ID: {job_id}\n\nNote: This is a demo. In production, you would poll for completion and display the video.",
                )
            else:
                error_data = response.json() if response.text else {}
                error_msg = error_data.get("message", f"HTTP {response.status_code}")
                return ("❌ Error", f"API Error: {error_msg}")

    except httpx.TimeoutException:
        return ("❌ Error", "Request timeout. Please try again.")
    except Exception as e:
        return ("❌ Error", f"Unexpected error: {str(e)}")


def generate_image(prompt: str, size: str, num_images: int) -> Tuple[str, str]:
    """
    Generate images from a text prompt

    Args:
        prompt: Text description of the image
        size: Image size
        num_images: Number of images to generate

    Returns:
        Tuple of (status message, image URLs or error)
    """
    if not API_KEY:
        return (
            "❌ Error",
            "OAKTIS_API_KEY environment variable is not set. Please configure it in the Space settings.",
        )

    if not prompt or not prompt.strip():
        return ("❌ Error", "Please enter a prompt")

    try:
        params = {"prompt": prompt.strip(), "size": size, "n": num_images}

        with httpx.Client(timeout=60.0) as client:
            response = client.post(
                f"{BASE_URL}/v1/image/generate",
                json=params,
                headers={
                    "Authorization": f"Bearer {API_KEY}",
                    "Content-Type": "application/json",
                    "X-Oaktis-Ref": "hf-space",
                },
            )

            if response.is_success:
                data = response.json()
                job_id = data.get("id", "N/A")
                status = data.get("status", "unknown")
                return (
                    f"✅ Job Submitted\n\nJob ID: {job_id}\nStatus: {status}",
                    f"Image generation started! Job ID: {job_id}\n\nNote: This is a demo. In production, you would poll for completion and display the images.",
                )
            else:
                error_data = response.json() if response.text else {}
                error_msg = error_data.get("message", f"HTTP {response.status_code}")
                return ("❌ Error", f"API Error: {error_msg}")

    except httpx.TimeoutException:
        return ("❌ Error", "Request timeout. Please try again.")
    except Exception as e:
        return ("❌ Error", f"Unexpected error: {str(e)}")


# Create Gradio interface
with gr.Blocks(title="Oaktis AI Demo", theme=gr.themes.Soft()) as demo:
    gr.Markdown(
        """
        # 🎬 Oaktis AI Demo

        **Create images & videos with AI**

        🔗 [Try Oaktis](https://oaktis.com/?utm_source=huggingface&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=space-header) |
        📚 [Documentation](https://docs.oaktis.com) |
        🐙 [GitHub](https://github.com/Oaktis/Oaktis)

        ---
        """
    )

    with gr.Tabs():
        # Video Generation Tab
        with gr.Tab("🎬 Video Generation"):
            gr.Markdown("### Generate AI-powered videos from text prompts")

            with gr.Row():
                with gr.Column():
                    video_prompt = gr.Textbox(
                        label="Prompt",
                        placeholder="a cat surfing on ocean waves at sunset",
                        lines=3,
                    )
                    video_duration = gr.Slider(
                        label="Duration (seconds)",
                        minimum=3,
                        maximum=30,
                        value=5,
                        step=1,
                    )
                    video_resolution = gr.Radio(
                        label="Resolution",
                        choices=["720p", "1080p", "4k"],
                        value="1080p",
                    )
                    video_btn = gr.Button("Generate Video", variant="primary")

                with gr.Column():
                    video_status = gr.Textbox(label="Status", lines=3)
                    video_output = gr.Textbox(label="Result", lines=5)

            video_btn.click(
                fn=generate_video,
                inputs=[video_prompt, video_duration, video_resolution],
                outputs=[video_status, video_output],
            )

            gr.Examples(
                examples=[
                    ["a cat surfing on ocean waves", 5, "1080p"],
                    ["a futuristic city with flying cars", 10, "1080p"],
                    ["a peaceful mountain landscape at sunrise", 8, "720p"],
                ],
                inputs=[video_prompt, video_duration, video_resolution],
            )

        # Image Generation Tab
        with gr.Tab("🖼️ Image Generation"):
            gr.Markdown("### Generate AI-powered images from text prompts")

            with gr.Row():
                with gr.Column():
                    image_prompt = gr.Textbox(
                        label="Prompt",
                        placeholder="a futuristic city at night with neon lights",
                        lines=3,
                    )
                    image_size = gr.Radio(
                        label="Size",
                        choices=["512x512", "1024x1024", "1024x1792", "1792x1024"],
                        value="1024x1024",
                    )
                    image_number = gr.Slider(
                        label="Number of Images",
                        minimum=1,
                        maximum=4,
                        value=1,
                        step=1,
                    )
                    image_btn = gr.Button("Generate Image", variant="primary")

                with gr.Column():
                    image_status = gr.Textbox(label="Status", lines=3)
                    image_output = gr.Textbox(label="Result", lines=5)

            image_btn.click(
                fn=generate_image,
                inputs=[image_prompt, image_size, image_number],
                outputs=[image_status, image_output],
            )

            gr.Examples(
                examples=[
                    ["a futuristic city at night", "1024x1024", 1],
                    ["abstract geometric art", "1024x1024", 2],
                    ["a serene beach at sunset", "1792x1024", 1],
                ],
                inputs=[image_prompt, image_size, image_number],
            )

    gr.Markdown(
        """
        ---

        ### 🚀 Get Started with Oaktis

        This is a demo interface for the Oaktis API. To use Oaktis in your own applications:

        - **JavaScript/TypeScript**: `npm install @oaktis/sdk`
        - **Python**: `pip install oaktis`
        - **CLI**: `npm install -g oaktis-cli`
        - **Docker**: `docker pull oaktis/cli`

        📖 Full documentation: [docs.oaktis.com](https://docs.oaktis.com)

        💡 **Note**: This Space requires an `OAKTIS_API_KEY` to be configured in the Space settings.
        Get your API key at [oaktis.com](https://oaktis.com/?utm_source=huggingface&utm_medium=devhub&utm_campaign=oss-sdk&utm_content=space-footer)
        """
    )

if __name__ == "__main__":
    demo.launch()
