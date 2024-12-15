import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDataDto } from './dto/create-master-jurusan.dto';
import { utimes } from 'fs';

@Injectable()
export class MasterJurusanService {
  constructor(private dbService: PrismaService) {}
  async create(data: CreateDataDto) {
    try {
      return this.dbService.$transaction(async (prisma) => {
        const mapping = {
          logo: data.filename,
          path_logo: data.path,
          nama: data.nama,
          sejarah_singkat: data.sejarah_singkat,
        };

        return await this.dbService.jurusan.create({ data: mapping })
      }).catch(error => {
        throw error
      });
    } catch (error) {
      throw error;
    }
  }

  async createGaleri(data: any) {
    try {
        return this.dbService.$transaction(async (prisma) => {
          for (const item of data.galeri) {
            item.jurusan_id = +data.jurusan_id
            item.nama_file = item.file
            item.path = data.path
            delete item.file
            await prisma.galeri_jurusan.create({data : item})
          }
        })
    } catch (error) {
      throw error;
    }
  }

  async createStruktur(data: any) {
    try {
        return this.dbService.$transaction(async (prisma) => {
          for (const item of data.struktur) {
            item.jurusan_id = +data.jurusan_id
            item.nama_foto = item.file
            item.path_foto = data.path
            item.order = +item.order
            delete item.file
            await this.dbService.struktur_org_jurusan.create({data : item});
        }
      })
    } catch (error) {
      throw error;
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
