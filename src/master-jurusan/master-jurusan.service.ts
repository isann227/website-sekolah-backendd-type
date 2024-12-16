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
        return await prisma.jurusan.create({ data: data })
      })
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
            await prisma.struktur_org_jurusan.create({data : item});
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async updateStruktur(data: any) {
    try {
        return this.dbService.$transaction(async (prisma) => {
          for (const item of data.struktur) {

            const where = {
              jurusan_id : item.jurusan_id,
              id : item.id,
            }

            const params_update = {
              order : item.order,
              jabatan : item.jabatan,
              nama : item.nama,
              nama_foto :item.nama_foto,
              path_foto : item.path
            }

            await prisma.struktur_org_jurusan.update({where : where, data : params_update});
        }
      })
    } catch (error) {
      throw error;
    }
  }

  
  async updateGaleri(data: any) {
    try {
        return this.dbService.$transaction(async (prisma) => {
          for (const item of data.galeri) {

            const where = {
              jurusan_id : item.jurusan_id,
              id : item.id,
            }

            const params_update = {
              judul : item.judul,
              deskripsi : item.deskripsi,
              path : item.path,
              nama_file :item.nama_file,
            }

            await prisma.galeri_jurusan.update({where : where, data : params_update});
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async findAll(search: string,  page: number, perpage: number) {

    let output = {
        list_data: [],
        search : search ,
        per_page: perpage,
        page: page,
        last_page: page,
        total_data: 0,
    }

    const filters: any = {};
    if (search) {
        filters.title = { contains: search }; // Filter berdasarkan "title"
    }

    let dataOut = await this.dbService.jurusan.findMany(
      {
          where: filters,
          include : {
              struktur_org_jurusan : true,  
              galeri_jurusan : true,  
          },
            skip: page > 1 ? ((page - 1) * perpage) : 0,
            take: perpage
          }
      );

    output.total_data = await this.dbService.jurusan.count({
        where: filters, // Hitung sesuai filter
    });

    output.last_page = Math.ceil(output.total_data / perpage)
    output.list_data = dataOut


    return output;
  }

  async findByJurusan(id : number) {
    try {
     return await this.dbService.jurusan.findFirst({
        where : {id:id},
        include : {
          galeri_jurusan : true,
          struktur_org_jurusan : true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    return await this.dbService.jurusan.findFirst({
      where : {id}, 
      include : {
        struktur_org_jurusan:true,
        galeri_jurusan: true
      }
    }
    );
  }

  update(id: number, data : any) {
    try {
      return this.dbService.$transaction(async (prisma) => {
        console.log(data.logo)
        if (!data.logo) {
            delete data.logo;
        }
        console.log(data)
        return await prisma.jurusan.update({
          data, where : {id}
        })
      })
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return this.dbService.$transaction(async (prisma) => {
        return await prisma.jurusan.delete({
          where : {id:id},
          include : {
            struktur_org_jurusan : true,
            galeri_jurusan : true
          }
        });
      });
    } catch (error) {
      throw error;
    };
  }
}
