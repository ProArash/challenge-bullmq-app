import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from './email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailProcessor],
})
export class EmailModule {}
