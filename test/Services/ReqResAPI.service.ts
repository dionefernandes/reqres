import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { ReqResAPIService } from '../../src/Services/ReqResAPI.service';
import path from 'path';
import * as fs from 'fs';

describe('ReqResAPIService', () => {
  let service: ReqResAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ReqResAPIService],
    }).compile();

    service = module.get<ReqResAPIService>(ReqResAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('downloadAvatar', () => {
    it('should download and save the avatar image', async () => {
      const avatarPath = 'https://reqres.in/img/faces/7-image.jpg';
      await service.downloadAvatar(avatarPath);
      const fileName = path.basename(avatarPath);
      const dirPath = path.resolve(__dirname, '../../src/Assets/AvatarImg');
      const filePath = `${dirPath}/${fileName}`;
      expect(fs.existsSync(filePath)).toBeTruthy();
    });
  });
});
