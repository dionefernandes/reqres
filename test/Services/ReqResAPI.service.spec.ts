import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReqResAPIService } from '../../src/Services/ReqResAPI.service';
import { RabbitMQService } from '../../src/Services/RabbitMQ.service';
import axios from 'axios';
import { listUsersMock } from '../../test/Mocks/APIService';

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
  };
};

// describe('ReqResAPIService', () => {
//   test('Should fetch users', async () => {
//     const reqResAPIModel = {
//       id: 1,
//       email: 'george.bluth@reqres.in',
//       first_name: 'George',
//       last_name: 'Bluth',
//       avatar: 'https://reqres.in/img/faces/1-image.jpg',
//     };

//     const { reqResAPIServiceMock } = await createTestingModuleContext(
//       reqResAPIModel,
//     );

//     jest.spyOn(axios, 'get').mockResolvedValueOnce(listUsersMock());
//     jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: 'any-data' });

//     await reqResAPIServiceMock.getUsers();
//   });
// });

describe('getUserIdAvatar', () => {
  it('should return the user with the given id', async () => {
    const id = 1;
    const userFound = {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    };

    const { reqResAPIServiceMock } = await createTestingModuleContext(
      userFound,
    );

    jest.spyOn(axios, 'get').mockResolvedValueOnce(listUsersMock());
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: 'any-data' });

    console.log(await reqResAPIServiceMock.getUserIdAvatar(id), '-----------');
    console.log({ id, userFound });

    expect(await reqResAPIServiceMock.getUserIdAvatar(id)).toEqual({
      id,
      userFound,
    });
    expect(reqResAPIServiceMock.getUserIdAvatar).toHaveBeenCalledWith(id);
  });
});
