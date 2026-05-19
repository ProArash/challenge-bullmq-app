import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  sendEmail(@Body() dto: CreateEmailDto) {
    return this.emailService.sendEmail(dto);
  }

  @Get()
  getEmails() {
    return this.emailService.getEmailsState();
  }
}
