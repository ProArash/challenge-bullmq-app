import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  process(job: Job<any, any, string>): any {
    console.log(`Processing job ${job.id} with data: ${job.data}`);

    const success = Math.random() < 0.2;
    if (!success) {
      throw new Error('Email service failed.');
    }
    return { status: 'sent', timestamp: new Date() };
  }

  @OnWorkerEvent('completed')
  onComplete(job: Job) {
    console.log(`Job ${job.id} completed.`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(`Job ${job.id} failed.`);
  }
}
