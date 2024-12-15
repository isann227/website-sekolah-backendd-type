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

        return await this.dbService.jurusan.create({ data: mapping });
      });
    } catch (error) {
      throw error;
    }
  }

  async createGaleri(data: any) {
    try {
      console.log(data)
      return this.dbService.$transaction(async (prisma) => {

        for (let i = 0; i < data.judul.length; i++) {
          const mapping = {
            jurusan_id : data.jurusan_id,
            judul: data.judul[i],
            deskripsi: data.deskripsi[i],
            path: data.path,
            nama_file: data.filename[i],
          };
          await this.dbService.galeri_jurusan.create({data : mapping});
        }
        return data;
      });


    } catch (error) {
      throw error;
    }
  }

  async createStruktur(data: any) {
    try {
        return this.dbService.$transaction(async (prisma) => {
          data.struktur.forEach(async item => {
            item.jurusan_id = +data.jurusan_id
            item.nama_foto = item.files
            item.path_foto = data.path
            item.order = +item.order
            delete item.files
            await this.dbService.struktur_org_jurusan.create({data : item});
          });
          return data;
        });
  
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
