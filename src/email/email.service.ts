import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}
  async sendEmail(dto: CreateEmailDto) {
    const isSuccess = Math.random() < 0.2;
    if (!isSuccess) {
      const job = await this.emailQueue.add(
        'email',
        {
          msg: 'sendig msg',
        },
        {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        },
      );
      return {
        msg: 'failed to send email',
        jobId: job.id,
      };
    }
    return {
      msg: `Email sent to ${dto.to}.`,
    };
  }

  async getEmailsState() {
    return await this.emailQueue.getJobs();
  }
}
