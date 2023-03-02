import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from '../../src/Services/RabbitMQ.service';
import amqp from 'amqplib';

const createTestingModuleContext = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [RabbitMQService],
  }).compile();

  const rabbitMQService = module.get<RabbitMQService>(RabbitMQService);

  return {
    module,
    rabbitMQService,
  };
};

describe('RabbitMQ Service', () => {
  test('Should run sendMessageToQueue', async () => {
    jest.mock('amqplib');

    const { rabbitMQService } = await createTestingModuleContext();

    const channel = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn(),
      close: jest.fn(),
      consume: jest.fn(),
    };

    const connection = {
      createChannel: jest.fn().mockResolvedValue(channel),
      close: jest.fn(),
    };

    const connectSpy = jest
      .spyOn(amqp, 'connect')
      .mockResolvedValue(connection);

    await rabbitMQService.sendMessageToQueue('any message');

    expect(connectSpy).toBeCalledWith('amqp://localhost');
    expect(connection.createChannel).toHaveBeenCalled();
    expect(channel.assertQueue).toHaveBeenCalled();
    expect(channel.sendToQueue).toHaveBeenCalled();
    expect(connection.close).toHaveBeenCalled();
    expect(channel.consume).toHaveBeenCalled();
  });
});
