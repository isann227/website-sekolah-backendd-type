import { Module } from '@nestjs/common';
import { MasterJurusanService } from './master-jurusan.service';
import { MasterJurusanController } from './master-jurusan.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
const fs = require('fs/promises');

@Module({
  controllers: [MasterJurusanController],
  providers: [MasterJurusanService],
  imports : [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/jurusan/file',
        filename: async (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          await fs.mkdir('/uploads/jurusan/file', { recursive: true });
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024, // Maksimal 5 MB
      },
    }),
  ]
})
export class MasterJurusanModule {}
