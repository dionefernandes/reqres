import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from '../../src/Services/RabbitMQ.service';

describe('RabbitMQService', () => {
  let service: RabbitMQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMQService],
    }).compile();

    service = module.get<RabbitMQService>(RabbitMQService);
    await service.connect();
  });

  afterEach(async () => {
    await service.disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send and receive a message from queue', async () => {
    const queue = 'test_queue';
    const message = 'test_message';

    // Subscribe to the queue
    const handler = jest.fn();
    await service.consume(queue, handler);

    // Publish a message to the queue
    await service.publish(queue, message);

    // Wait for the message to be received
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check that the handler was called with the correct message
    expect(handler).toHaveBeenCalledWith(message);
  });
});
