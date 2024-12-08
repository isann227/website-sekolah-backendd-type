import { Test, TestingModule } from '@nestjs/testing';
import { OssModuleService } from './oss_module.service';

describe('OssModuleService', () => {
  let service: OssModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OssModuleService],
    }).compile();

    service = module.get<OssModuleService>(OssModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
