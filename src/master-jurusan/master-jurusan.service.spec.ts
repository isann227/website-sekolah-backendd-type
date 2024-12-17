import { Test, TestingModule } from '@nestjs/testing';
import { MasterJurusanService } from './master-jurusan.service';

describe('MasterJurusanService', () => {
  let service: MasterJurusanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterJurusanService],
    }).compile();

    service = module.get<MasterJurusanService>(MasterJurusanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
