import { Test, TestingModule } from '@nestjs/testing';
import { OssModuleController } from './oss_module.controller';

describe('OssModuleController', () => {
  let controller: OssModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OssModuleController],
    }).compile();

    controller = module.get<OssModuleController>(OssModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
