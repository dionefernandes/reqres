import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  async sendMessageToQueue(message: string): Promise<void> {
    try {
      const queue = 'my_queue';
      const connection = await amqp.connect('amqp://localhost');
      console.log('Connected to RabbitMQ!');
      const channel = await connection.createChannel();
      await channel.assertQueue(queue);
      await channel.sendToQueue(queue, Buffer.from(message));
      await channel.close();
      await connection.close();
    } catch (err) {
      console.error('Error connecting to RabbitMQ:', err.message);
    }

    await this.listenToQueue();
  }

  async listenToQueue(): Promise<void> {
    const queue = 'my_queue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    await channel.consume(queue, (message) => {
      if (message !== null) {
        console.log(`Received message: ${message.content.toString()}`);
        channel.ack(message);
      }
    });
  }
}
