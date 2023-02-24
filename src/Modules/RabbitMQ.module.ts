import { Module } from '@nestjs/common';
import { RabbitMQService } from '../Services/RabbitMQ.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
