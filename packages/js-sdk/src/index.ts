/**
 * Oaktis SDK for JavaScript/TypeScript
 * Official client library for the Oaktis API
 *
 * @packageDocumentation
 */

export { OaktisClient } from './client';
export type {
  OaktisConfig,
  VideoGenerateParams,
  ImageGenerateParams,
  VideoJob,
  ImageJob,
  JobStatus,
  APIError,
} from './types';

// Default export for convenience
export { OaktisClient as default } from './client';
