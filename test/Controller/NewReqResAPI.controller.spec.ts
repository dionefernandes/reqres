import { Test, TestingModule } from '@nestjs/testing';
import { ReqResAPIController } from '../../src/Controllers/ReqResAPI.controller';
import { ReqResAPIService } from '../../src/Services/ReqResAPI.service';
import * as mockService from '../../test/Mocks/APIService';
import request from 'supertest';
import { ReqResAPIDTO } from 'src/Dtos/ReqResAPI.dto';

describe('ReqResAPIController', () => {
  let controllerReqResAPI: ReqResAPIController;
  let serviceReqResAPI: ReqResAPIService;
  let app;

  const mockReqResAPIService = {
    getUsers: () => {
      const listUsersMock = mockService.listUsersMock;
      return Promise.resolve(listUsersMock);
    },

    getUserId: (id: number) => {
      const singleUserMock = mockService.singleUserMock;
      return Promise.resolve(singleUserMock);
    },

    // getUserIdAvatar: (id: number) => {
    //   const singleUserMock = mockService.singleUserMock;
    //   return Promise.resolve(singleUserMock);
    // },

    // deleteUserIdAvatar: (id: number) => {
    //   return Promise.resolve(`User with id ${id} deleted successfully`);
    // },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReqResAPIController],
      providers: [ReqResAPIService],
    })
      .overrideProvider(ReqResAPIService)
      .useValue(mockReqResAPIService)
      .compile();

    controllerReqResAPI = module.get<ReqResAPIController>(ReqResAPIController);
    serviceReqResAPI = module.get<ReqResAPIService>(ReqResAPIService);

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(serviceReqResAPI, 'getUsers')
        .mockResolvedValue([mockService.listUsersDTOMock]);

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .expect(201);
      expect(response.body).toEqual([mockService.listUsersDTOMock]);
    });
  });

  describe('getUserId', () => {
    it('should return the user with the given id', async () => {
      const id = 1;

      jest
        .spyOn(serviceReqResAPI, 'getUserId')
        .mockResolvedValue(mockService.listUsersDTOMock);

      const response = await request(app.getHttpServer())
        .get(`/api/users/${id}`)
        .expect(200);
      //expect(response.body).toEqual(mockService.listUsersDTOMock);
      expect(response.body).toEqual(mockService.listUsersDTOMock);
    });
  });
});
