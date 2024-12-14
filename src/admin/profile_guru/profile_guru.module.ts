import { Module } from '@nestjs/common';
import { ProfileGuruService } from './profile_guru.service';
import { ProfileGuruController } from './profile_guru.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [ProfileGuruController],
  providers: [UserService, PrismaService, ProfileGuruService],
})
export class ProfileGuruModule {}
