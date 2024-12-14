import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDataDto } from './dto/create-master-jurusan.dto';

@Injectable()
export class MasterJurusanService {
  constructor(
    private dbService: PrismaService
  ){}
  async create(data : CreateDataDto) {
    try {
      const mapping = {
        logo : data.filename,
        path_logo : data.path,
        nama : data.nama,
        sejarah_singkat : data.sejarah_singkat
      }

      return await this.dbService.jurusan.create({data : mapping});      
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all masterJurusan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterJurusan`;
  }

  update(id: number, updateMasterJurusanDto) {
    return `This action updates a #${id} masterJurusan`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterJurusan`;
  }
}
