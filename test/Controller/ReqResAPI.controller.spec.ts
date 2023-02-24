import { Test, TestingModule } from '@nestjs/testing';
import { ReqResAPIController } from '../../src/Controllers/ReqResAPI.controller';
import { ReqResAPIService } from '../../src/Services/ReqResAPI.service';
import { ReqResAPIDTO } from 'src/Dtos/ReqResAPI.dto';
import { NotFoundException } from '@nestjs/common';

describe('ReqResAPIController', () => {
  let controller: ReqResAPIController;
  let service: ReqResAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReqResAPIController],
      providers: [
        {
          provide: ReqResAPIService,
          useValue: {
            getUsers: jest.fn().mockResolvedValue([
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
            ]),
            getUserId: jest.fn().mockResolvedValue([
              {
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://reqres.in/img/faces/1-image.jpg',
              },
            ]),
            getUserIdAvatar: jest.fn().mockResolvedValue([
              {
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://reqres.in/img/faces/1-image.jpg',
              },
            ]),
            deleteUserIdAvatar: jest.fn().mockResolvedValue([
              {
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://reqres.in/img/faces/1-image.jpg',
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<ReqResAPIController>(ReqResAPIController);
    service = module.get<ReqResAPIService>(ReqResAPIService);
  });

  describe('getUsers', () => {
    const expectedUsers: ReqResAPIDTO[] = [
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

    it('should return an array of users', async () => {
      expect(await controller.getUsers()).toEqual(expectedUsers);
    });

    it('should throw an error if the API returns an error', async () => {
      jest
        .spyOn(service, 'getUsers')
        .mockRejectedValueOnce(new Error('API error'));

      await expect(controller.getUsers()).rejects.toThrow(Error);
    });
  });

  describe('getUserId', () => {
    const expectedUser: ReqResAPIDTO = {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    };
    const id = 1;

    it('should return the user with the given id', async () => {
      jest.spyOn(service, 'getUserId').mockResolvedValueOnce(expectedUser);

      const result = await controller.getUserId(id);

      expect(result).toEqual(expectedUser);
      expect(service.getUserId).toHaveBeenCalledWith(id);
    });

    it('should return the user with the given id', async () => {
      jest.spyOn(service, 'getUserId').mockResolvedValueOnce(expectedUser);

      const result = await controller.getUserId(id);

      expect(result).toEqual(expectedUser);
      expect(service.getUserId).toHaveBeenCalledWith(id);
    });
  });

  describe('getUserIdAvatar', () => {
    const id = 1;
    const userFound = {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    };

    it('should return the user with the given id', async () => {
      jest.spyOn(service, 'getUserIdAvatar').mockResolvedValueOnce(userFound);

      const result = await controller.getUserIdAvatar(id);

      expect(result).toEqual(userFound);
      expect(service.getUserIdAvatar).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if user with the given id is not found', async () => {
      jest
        .spyOn(service, 'getUserIdAvatar')
        .mockRejectedValueOnce(
          new NotFoundException(`User with id ${id} not found`),
        );

      await expect(controller.getUserIdAvatar(id)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.getUserIdAvatar).toHaveBeenCalledWith(id);
    });
  });

  describe('deleteUserIdAvatar', () => {
    const id = 1000;
    const message = `User with id ${id} deleted successfully`;

    it('should delete user with the given id and return a success message', async () => {
      jest.spyOn(service, 'deleteUserIdAvatar').mockResolvedValueOnce(message);

      const result = await controller.deleteUserIdAvatar(id);

      expect(result).toEqual(message);
      expect(service.deleteUserIdAvatar).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if user with the given id is not found', async () => {
      jest
        .spyOn(service, 'deleteUserIdAvatar')
        .mockRejectedValueOnce(
          new NotFoundException(`User with id ${id} not found`),
        );

      await expect(controller.deleteUserIdAvatar(id)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.deleteUserIdAvatar).toHaveBeenCalledWith(id);
    });
  });
});
