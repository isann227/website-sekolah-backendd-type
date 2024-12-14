import { Test, TestingModule } from '@nestjs/testing';
import { MasterJurusanController } from './master-jurusan.controller';
import { MasterJurusanService } from './master-jurusan.service';

describe('MasterJurusanController', () => {
  let controller: MasterJurusanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterJurusanController],
      providers: [MasterJurusanService],
    }).compile();

    controller = module.get<MasterJurusanController>(MasterJurusanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
