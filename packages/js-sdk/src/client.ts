import fetch from 'cross-fetch';
import type {
  OaktisConfig,
  VideoGenerateParams,
  ImageGenerateParams,
  VideoJob,
  ImageJob,
  JobStatus,
  APIError
} from './types';

export class OaktisClient {
  private apiKey: string;
  private baseUrl: string;
  private timeout: number;

  constructor(config: OaktisConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.oaktis.com';
    this.timeout = config.timeout || 60000;
  }

  /**
   * Make an authenticated request to the Oaktis API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-Oaktis-Ref': 'npm-sdk',
      ...options.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: APIError = {
          code: errorData.code || 'API_ERROR',
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          details: errorData,
        };
        throw error;
      }

      return await response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw {
          code: 'TIMEOUT',
          message: `Request timeout after ${this.timeout}ms`,
          status: 0,
        } as APIError;
      }

      throw error;
    }
  }

  /**
   * Video generation API
   */
  public video = {
    /**
     * Generate a video from a text prompt
     */
    generate: async (params: VideoGenerateParams): Promise<VideoJob> => {
      return this.request<VideoJob>('/v1/video/generate', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },

    /**
     * Get the status of a video generation job
     */
    getStatus: async (jobId: string): Promise<JobStatus> => {
      return this.request<JobStatus>(`/v1/video/jobs/${jobId}`);
    },

    /**
     * Get video job details
     */
    getJob: async (jobId: string): Promise<VideoJob> => {
      return this.request<VideoJob>(`/v1/video/jobs/${jobId}/details`);
    },
  };

  /**
   * Image generation API
   */
  public image = {
    /**
     * Generate an image from a text prompt
     */
    generate: async (params: ImageGenerateParams): Promise<ImageJob> => {
      return this.request<ImageJob>('/v1/image/generate', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },

    /**
     * Get the status of an image generation job
     */
    getStatus: async (jobId: string): Promise<JobStatus> => {
      return this.request<JobStatus>(`/v1/image/jobs/${jobId}`);
    },

    /**
     * Get image job details
     */
    getJob: async (jobId: string): Promise<ImageJob> => {
      return this.request<ImageJob>(`/v1/image/jobs/${jobId}/details`);
    },
  };
}
