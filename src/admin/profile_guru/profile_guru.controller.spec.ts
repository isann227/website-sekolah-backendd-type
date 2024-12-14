import { Test, TestingModule } from '@nestjs/testing';
import { ProfileGuruController } from './profile_guru.controller';
import { ProfileGuruService } from './profile_guru.service';

describe('ProfileGuruController', () => {
  let controller: ProfileGuruController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileGuruController],
      providers: [ProfileGuruService],
    }).compile();

    controller = module.get<ProfileGuruController>(ProfileGuruController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
