import { Module } from '@nestjs/common';
import { MasterJurusanService } from './master-jurusan.service';
import { MasterJurusanController } from './master-jurusan.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [MasterJurusanController],
  providers: [MasterJurusanService],
})
export class MasterJurusanModule {}
