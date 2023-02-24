import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ReqResAPIDTO } from '../../src/Dtos/ReqResAPI.dto';
import { ReqResAPIInterface } from '../../src/Interfaces/ReqResAPI.interface';
import { RabbitMQService } from '../../src/Services/RabbitMQ.service';
import { ReqResAPIService } from '../../src/Services/ReqResAPI.service';

describe('ReqResAPIService', () => {
  let service: ReqResAPIService;
  let model: Model<ReqResAPIInterface>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let rabbitMQService: RabbitMQService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReqResAPIService,
        {
          provide: 'reqResAPIModel',
          useValue: {
            findOne: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
        {
          provide: RabbitMQService,
          useValue: {
            sendMessageToQueue: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ReqResAPIService>(ReqResAPIService);
    model = moduleRef.get<Model<ReqResAPIInterface>>('reqResAPIModel');
    rabbitMQService = moduleRef.get<RabbitMQService>(RabbitMQService);
  });

  describe('deleteUserIdAvatar', () => {
    const id = 1;

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce(null);

      await expect(service.deleteUserIdAvatar(id)).rejects.toThrowError(
        new NotFoundException(`User with id ${id} not found`),
      );
    });

    it('should delete user and avatar if user is found', async () => {
      const user: ReqResAPIDTO = {
        id,
        email: 'test@test.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'avatar',
      };
      jest.spyOn(model, 'findOne').mockReturnValueOnce(user as any);
      jest.spyOn(service, 'deleteAvatar').mockReturnValueOnce(undefined);

      const result = await service.deleteUserIdAvatar(id);

      expect(result).toEqual({
        message: `User with id ${id} deleted successfully`,
      });
      expect(model.findOne).toHaveBeenCalledWith({ id });
      expect(model.deleteOne).toHaveBeenCalledWith({ id });
      expect(service.deleteAvatar).toHaveBeenCalledWith(id);
    });
  });
});
