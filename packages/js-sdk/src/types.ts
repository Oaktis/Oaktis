/**
 * Oaktis SDK Type Definitions
 */

export interface OaktisConfig {
  /** API Key for authentication */
  apiKey: string;
  /** Base URL for the Oaktis API (default: https://api.oaktis.com) */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 60000) */
  timeout?: number;
}

export interface VideoGenerateParams {
  /** Text prompt describing the video to generate */
  prompt: string;
  /** Video duration in seconds (optional) */
  duration?: number;
  /** Video resolution (optional) */
  resolution?: '720p' | '1080p' | '4k';
  /** Additional generation parameters */
  [key: string]: any;
}

export interface ImageGenerateParams {
  /** Text prompt describing the image to generate */
  prompt: string;
  /** Image size (optional) */
  size?: '512x512' | '1024x1024' | '1024x1792' | '1792x1024';
  /** Number of images to generate (optional) */
  n?: number;
  /** Additional generation parameters */
  [key: string]: any;
}

export interface Job {
  /** Unique job identifier */
  id: string;
  /** Job status */
  status: 'pending' | 'processing' | 'completed' | 'failed';
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
  /** Error message if job failed */
  error?: string;
}

export interface VideoJob extends Job {
  /** Video generation parameters */
  params: VideoGenerateParams;
  /** Generated video URL (when completed) */
  videoUrl?: string;
  /** Thumbnail URL (when completed) */
  thumbnailUrl?: string;
}

export interface ImageJob extends Job {
  /** Image generation parameters */
  params: ImageGenerateParams;
  /** Generated image URLs (when completed) */
  imageUrls?: string[];
}

export interface JobStatus {
  /** Job identifier */
  id: string;
  /** Current status */
  status: 'pending' | 'processing' | 'completed' | 'failed';
  /** Progress percentage (0-100) */
  progress?: number;
  /** Estimated time remaining in seconds */
  estimatedTime?: number;
  /** Error details if failed */
  error?: string;
}

export interface APIError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** HTTP status code */
  status: number;
  /** Additional error details */
  details?: any;
}
