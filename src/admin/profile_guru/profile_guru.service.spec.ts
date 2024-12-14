import { Test, TestingModule } from '@nestjs/testing';
import { ProfileGuruService } from './profile_guru.service';

describe('ProfileGuruService', () => {
  let service: ProfileGuruService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileGuruService],
    }).compile();

    service = module.get<ProfileGuruService>(ProfileGuruService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
