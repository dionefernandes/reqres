import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { ReqResAPIService } from '../../src/Services/ReqResAPI.service';

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
});
