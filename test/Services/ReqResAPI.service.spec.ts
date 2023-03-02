import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReqResAPIService } from '../../src/Services/ReqResAPI.service';
import { RabbitMQService } from '../../src/Services/RabbitMQ.service';
import * as mockService from '../Mocks/APIService';
import { NotFoundException } from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';
import { reqResAPIModel } from '../../src/Models/ReqResAPI.model';

jest.mock('axios');
jest.mock('request', () => {
  const mockRequest = {
    pipe: jest.fn().mockReturnValue({}),
  };
  return function () {
    return mockRequest;
  };
});

const createTestingModuleContext = async (responseModel) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ReqResAPIService,
      {
        provide: RabbitMQService,
        useValue: {
          sendMessageToQueue: jest.fn(),
          listenToQueue: jest.fn(),
        },
      },
      {
        provide: getModelToken('reqResAPIModel'),
        useValue: {
          findOne: jest.fn().mockResolvedValueOnce(responseModel),
        },
      },
    ],
  }).compile();

  const reqResAPIServiceMock = module.get<ReqResAPIService>(ReqResAPIService);

  return {
    module,
    reqResAPIServiceMock,
    reqResAPIModel,
  };
};

describe('getUserId', () => {
  const id = 1;

  test('should return the user with the given id', async () => {
    const { reqResAPIServiceMock } = await createTestingModuleContext(
      mockService.singleUserMock,
    );

    jest
      .spyOn(reqResAPIServiceMock, 'getUserId')
      .mockResolvedValueOnce(mockService.listUsersDTOMock);

    const result = await reqResAPIServiceMock.getUserId(id);

    expect(result).toEqual(mockService.listUsersDTOMock);
    expect(reqResAPIServiceMock.getUserId).toHaveBeenCalledWith(id);
  });

  test('should return the user with the given id', async () => {
    const { reqResAPIServiceMock } = await createTestingModuleContext(
      mockService.singleUserMock,
    );

    jest
      .spyOn(reqResAPIServiceMock, 'getUserId')
      .mockRejectedValueOnce(
        new NotFoundException(`User with id ${id} not found`),
      );

    await expect(reqResAPIServiceMock.getUserId(id)).rejects.toThrow(
      new NotFoundException(`User with id ${id} not found`),
    );

    expect(reqResAPIServiceMock.getUserId).toHaveBeenCalledWith(id);
  });
});

describe('getUserIdAvatar', () => {
  const id = 1;

  test('should return the user with the given id', async () => {
    const { reqResAPIServiceMock } = await createTestingModuleContext(
      mockService.singleUserMock,
    );

    jest
      .spyOn(reqResAPIServiceMock, 'getUserIdAvatar')
      .mockResolvedValueOnce(mockService.listUsersDTOMock);

    const result = await reqResAPIServiceMock.getUserIdAvatar(id);

    expect(result).toEqual(mockService.listUsersDTOMock);
    expect(reqResAPIServiceMock.getUserIdAvatar).toHaveBeenCalledWith(id);
  });

  test('should throw NotFoundException if user with the given id is not found', async () => {
    const { reqResAPIServiceMock } = await createTestingModuleContext(
      mockService.singleUserMock,
    );

    jest
      .spyOn(reqResAPIServiceMock, 'getUserIdAvatar')
      .mockRejectedValueOnce(
        new NotFoundException(`User with id ${id} not found`),
      );

    await expect(reqResAPIServiceMock.getUserIdAvatar(id)).rejects.toThrow(
      NotFoundException,
    );
    expect(reqResAPIServiceMock.getUserIdAvatar).toHaveBeenCalledWith(id);
  });
});

describe('deleteUserIdAvatar', () => {
  const id = 1000;
  const message = `User with id ${id} deleted successfully`;

  test('should delete user with the given id and return a success message', async () => {
    const { reqResAPIServiceMock } = await createTestingModuleContext(
      mockService.singleUserMock,
    );

    jest
      .spyOn(reqResAPIServiceMock, 'deleteUserIdAvatar')
      .mockResolvedValueOnce(message);

    const result = await reqResAPIServiceMock.deleteUserIdAvatar(id);

    expect(result).toEqual(message);
    expect(reqResAPIServiceMock.deleteUserIdAvatar).toHaveBeenCalledWith(id);
  });

  test('should throw NotFoundException if user with the given id is not found', async () => {
    const { reqResAPIServiceMock } = await createTestingModuleContext(
      mockService.singleUserMock,
    );

    jest
      .spyOn(reqResAPIServiceMock, 'deleteUserIdAvatar')
      .mockRejectedValueOnce(
        new NotFoundException(`User with id ${id} not found`),
      );

    await expect(reqResAPIServiceMock.deleteUserIdAvatar(id)).rejects.toThrow(
      NotFoundException,
    );
    expect(reqResAPIServiceMock.deleteUserIdAvatar).toHaveBeenCalledWith(id);
  });
});

describe('deleteAvatar', () => {
  test('should delete the avatar image file with the given id', async () => {
    const { reqResAPIServiceMock } = await createTestingModuleContext(
      mockService.singleUserMock,
    );

    const id = 1;
    const fileName = `${id}-image.jpg`;
    const dirPath = path.resolve(__dirname, '../../src/Assets/AvatarImg');
    const message = `Avatar image file with id ${id} deleted successfully`;

    console.log(dirPath, ' + ', fileName);

    fs.writeFileSync(`${dirPath}/${fileName}`, 'Test file content');

    const result = await reqResAPIServiceMock.deleteAvatar(id);

    expect(fs.existsSync(`${dirPath}/${fileName}`)).toBe(false);
    expect(result).toEqual(message);
  });
});
