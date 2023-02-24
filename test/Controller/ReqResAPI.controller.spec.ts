import { Test, TestingModule } from '@nestjs/testing';
import { ReqResAPIController } from '../../src/Controllers/ReqResAPI.controller';
import { ReqResAPIService } from '../../src/Services/ReqResAPI.service';

describe('ReqResAPIController', () => {
  let controller: ReqResAPIController;
  let service: ReqResAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReqResAPIController],
      providers: [ReqResAPIService],
    }).compile();

    controller = module.get<ReqResAPIController>(ReqResAPIController);
    service = module.get<ReqResAPIService>(ReqResAPIService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const fakeUsers = [
        {
          id: 7,
          email: 'michael.lawson@reqres.in',
          first_name: 'Michael',
          last_name: 'Lawson',
          avatar: 'https://reqres.in/img/faces/7-image.jpg',
        },
        {
          id: 8,
          email: 'lindsay.ferguson@reqres.in',
          first_name: 'Lindsay',
          last_name: 'Ferguson',
          avatar: 'https://reqres.in/img/faces/8-image.jpg',
        },
      ];

      jest.spyOn(service, 'getUsers').mockResolvedValue(fakeUsers);

      expect(await controller.getUsers()).toEqual(fakeUsers);
    });
  });

  describe('getUserId', () => {
    it('should return a user by id', async () => {
      const fakeUser = {
        id: 7,
        email: 'michael.lawson@reqres.in',
        first_name: 'Michael',
        last_name: 'Lawson',
        avatar: 'https://reqres.in/img/faces/7-image.jpg',
      };

      jest.spyOn(service, 'getUserId').mockResolvedValue(fakeUser);

      expect(await controller.getUserId(fakeUser.id)).toEqual(fakeUser);
    });
  });
});
