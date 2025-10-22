#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { config } from 'dotenv';
import { OaktisClient } from '@ververv/oaktis-sdk';
import type { JobStatus } from '@ververv/oaktis-sdk';

// Load environment variables
config();

const program = new Command();

program
  .name('oaktis')
  .description('Oaktis CLI - AI-powered image & video generation')
  .version('0.1.0');

/**
 * Poll job status until completion
 */
async function pollJobStatus(
  client: OaktisClient,
  jobId: string,
  type: 'video' | 'image'
): Promise<void> {
  const spinner = ora('Processing...').start();
  let lastProgress = 0;

  while (true) {
    try {
      let status: JobStatus;

      if (type === 'video') {
        status = await client.video.getStatus(jobId);
      } else {
        status = await client.image.getStatus(jobId);
      }

      // Update spinner with progress
      if (status.progress !== undefined && status.progress !== lastProgress) {
        spinner.text = `Processing... ${status.progress}%`;
        lastProgress = status.progress;
      }

      if (status.status === 'completed') {
        spinner.succeed(chalk.green('Generation completed!'));
        return;
      }

      if (status.status === 'failed') {
        spinner.fail(chalk.red(`Generation failed: ${status.error || 'Unknown error'}`));
        process.exit(1);
      }

      // Wait 2 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error: any) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  }
}

/**
 * Video generation command
 */
program
  .command('video')
  .description('Generate a video from a text prompt')
  .argument('<prompt>', 'Text description of the video')
  .option('-d, --duration <seconds>', 'Video duration in seconds', parseInt)
  .option('-r, --resolution <res>', 'Video resolution (720p, 1080p, 4k)', '1080p')
  .option('--no-wait', 'Do not wait for completion')
  .action(async (prompt: string, options: any) => {
    const apiKey = process.env.OAKTIS_API_KEY;

    if (!apiKey) {
      console.error(chalk.red('Error: OAKTIS_API_KEY environment variable is required'));
      console.log(chalk.yellow('\nSet your API key:'));
      console.log(chalk.cyan('  export OAKTIS_API_KEY=your-api-key'));
      console.log(chalk.yellow('\nOr create a .env file with:'));
      console.log(chalk.cyan('  OAKTIS_API_KEY=your-api-key'));
      process.exit(1);
    }

    const client = new OaktisClient({ apiKey });
    const spinner = ora('Submitting video generation request...').start();

    try {
      const job = await client.video.generate({
        prompt,
        duration: options.duration,
        resolution: options.resolution,
      });

      spinner.succeed(chalk.green('Job submitted successfully!'));
      console.log(chalk.cyan(`Job ID: ${job.id}`));
      console.log(chalk.cyan(`Status: ${job.status}`));

      if (options.wait) {
        console.log('');
        await pollJobStatus(client, job.id, 'video');

        // Get final job details
        const completedJob = await client.video.getJob(job.id);
        console.log('');
        console.log(chalk.green('✓ Video URL:'), chalk.cyan(completedJob.videoUrl || 'N/A'));
        if (completedJob.thumbnailUrl) {
          console.log(chalk.green('✓ Thumbnail:'), chalk.cyan(completedJob.thumbnailUrl));
        }
      } else {
        console.log('');
        console.log(chalk.yellow('Use the following command to check status:'));
        console.log(chalk.cyan(`  oaktis status ${job.id} --type video`));
      }
    } catch (error: any) {
      spinner.fail(chalk.red(`Error: ${error.message || error}`));
      process.exit(1);
    }
  });

/**
 * Image generation command
 */
program
  .command('image')
  .description('Generate an image from a text prompt')
  .argument('<prompt>', 'Text description of the image')
  .option('-s, --size <size>', 'Image size (512x512, 1024x1024, 1024x1792, 1792x1024)', '1024x1024')
  .option('-n, --number <n>', 'Number of images to generate', parseInt, 1)
  .option('--no-wait', 'Do not wait for completion')
  .action(async (prompt: string, options: any) => {
    const apiKey = process.env.OAKTIS_API_KEY;

    if (!apiKey) {
      console.error(chalk.red('Error: OAKTIS_API_KEY environment variable is required'));
      console.log(chalk.yellow('\nSet your API key:'));
      console.log(chalk.cyan('  export OAKTIS_API_KEY=your-api-key'));
      process.exit(1);
    }

    const client = new OaktisClient({ apiKey });
    const spinner = ora('Submitting image generation request...').start();

    try {
      const job = await client.image.generate({
        prompt,
        size: options.size as any,
        n: options.number,
      });

      spinner.succeed(chalk.green('Job submitted successfully!'));
      console.log(chalk.cyan(`Job ID: ${job.id}`));
      console.log(chalk.cyan(`Status: ${job.status}`));

      if (options.wait) {
        console.log('');
        await pollJobStatus(client, job.id, 'image');

        // Get final job details
        const completedJob = await client.image.getJob(job.id);
        console.log('');
        if (completedJob.imageUrls && completedJob.imageUrls.length > 0) {
          console.log(chalk.green(`✓ Generated ${completedJob.imageUrls.length} image(s):`));
          completedJob.imageUrls.forEach((url, i) => {
            console.log(chalk.cyan(`  ${i + 1}. ${url}`));
          });
        }
      } else {
        console.log('');
        console.log(chalk.yellow('Use the following command to check status:'));
        console.log(chalk.cyan(`  oaktis status ${job.id} --type image`));
      }
    } catch (error: any) {
      spinner.fail(chalk.red(`Error: ${error.message || error}`));
      process.exit(1);
    }
  });

/**
 * Status check command
 */
program
  .command('status')
  .description('Check the status of a generation job')
  .argument('<jobId>', 'Job ID to check')
  .option('-t, --type <type>', 'Job type (video or image)', 'video')
  .action(async (jobId: string, options: any) => {
    const apiKey = process.env.OAKTIS_API_KEY;

    if (!apiKey) {
      console.error(chalk.red('Error: OAKTIS_API_KEY environment variable is required'));
      process.exit(1);
    }

    const client = new OaktisClient({ apiKey });
    const spinner = ora('Fetching job status...').start();

    try {
      let status: JobStatus;
      if (options.type === 'video') {
        status = await client.video.getStatus(jobId);
      } else {
        status = await client.image.getStatus(jobId);
      }

      spinner.succeed(chalk.green('Status fetched successfully!'));
      console.log('');
      console.log(chalk.cyan('Job ID:'), jobId);
      console.log(chalk.cyan('Status:'), getStatusColor(status.status));

      if (status.progress !== undefined) {
        console.log(chalk.cyan('Progress:'), `${status.progress}%`);
      }

      if (status.estimatedTime !== undefined) {
        console.log(chalk.cyan('Estimated time:'), `${status.estimatedTime}s`);
      }

      if (status.error) {
        console.log(chalk.red('Error:'), status.error);
      }

      if (status.status === 'completed') {
        console.log('');
        console.log(chalk.yellow('Use the following command to get the result:'));
        console.log(chalk.cyan(`  oaktis get ${jobId} --type ${options.type}`));
      }
    } catch (error: any) {
      spinner.fail(chalk.red(`Error: ${error.message || error}`));
      process.exit(1);
    }
  });

/**
 * Get job result command
 */
program
  .command('get')
  .description('Get the result of a completed job')
  .argument('<jobId>', 'Job ID to retrieve')
  .option('-t, --type <type>', 'Job type (video or image)', 'video')
  .action(async (jobId: string, options: any) => {
    const apiKey = process.env.OAKTIS_API_KEY;

    if (!apiKey) {
      console.error(chalk.red('Error: OAKTIS_API_KEY environment variable is required'));
      process.exit(1);
    }

    const client = new OaktisClient({ apiKey });
    const spinner = ora('Fetching job details...').start();

    try {
      if (options.type === 'video') {
        const job = await client.video.getJob(jobId);
        spinner.succeed(chalk.green('Job details fetched!'));
        console.log('');
        console.log(chalk.cyan('Job ID:'), job.id);
        console.log(chalk.cyan('Status:'), getStatusColor(job.status));
        console.log(chalk.cyan('Created:'), job.createdAt);
        console.log(chalk.cyan('Updated:'), job.updatedAt);

        if (job.videoUrl) {
          console.log('');
          console.log(chalk.green('✓ Video URL:'), chalk.cyan(job.videoUrl));
        }

        if (job.thumbnailUrl) {
          console.log(chalk.green('✓ Thumbnail:'), chalk.cyan(job.thumbnailUrl));
        }

        if (job.error) {
          console.log(chalk.red('Error:'), job.error);
        }
      } else {
        const job = await client.image.getJob(jobId);
        spinner.succeed(chalk.green('Job details fetched!'));
        console.log('');
        console.log(chalk.cyan('Job ID:'), job.id);
        console.log(chalk.cyan('Status:'), getStatusColor(job.status));
        console.log(chalk.cyan('Created:'), job.createdAt);
        console.log(chalk.cyan('Updated:'), job.updatedAt);

        if (job.imageUrls && job.imageUrls.length > 0) {
          console.log('');
          console.log(chalk.green(`✓ Generated ${job.imageUrls.length} image(s):`));
          job.imageUrls.forEach((url, i) => {
            console.log(chalk.cyan(`  ${i + 1}. ${url}`));
          });
        }

        if (job.error) {
          console.log(chalk.red('Error:'), job.error);
        }
      }
    } catch (error: any) {
      spinner.fail(chalk.red(`Error: ${error.message || error}`));
      process.exit(1);
    }
  });

/**
 * Helper function to colorize status
 */
function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return chalk.green(status);
    case 'processing':
      return chalk.yellow(status);
    case 'pending':
      return chalk.blue(status);
    case 'failed':
      return chalk.red(status);
    default:
      return status;
  }
}

// Parse command line arguments
program.parse();
