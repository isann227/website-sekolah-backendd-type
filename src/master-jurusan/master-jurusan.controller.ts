import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  HttpException,
  HttpStatus,
  ConsoleLogger,
} from '@nestjs/common';
import { MasterJurusanService } from './master-jurusan.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { diskStorage } from 'multer';
import { CreateDataDto } from './dto/create-master-jurusan.dto';
import { HelperFun } from 'src/helper/helper_fun';
import { StrukturDto } from './dto/struktur-jurusan-dto.dto';
import { GaleriJurusanDto } from './dto/galeri-jurusan-dto.dto';

@Controller('jurusan')
export class MasterJurusanController {

  private pathJurusan = 'uploads/jurusan/image/'
  constructor(private readonly masterJurusanService: MasterJurusanService) {
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() data: CreateDataDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    try {
      data.filename = file.filename;
      data.path = this.pathJurusan;
      await this.masterJurusanService.create(data);
      return res.send(201, {
        message: 'Berhasil menyimpan data.',
        statusCode: 201,
        data: HelperFun.toObject(data),
      });
    } catch (error) {
      console.warn(error);
    }
    // return this.masterJurusanService.create(createMasterJurusanDto);
  }

  @Post('galeri')
  @UseInterceptors(AnyFilesInterceptor())
  async createGaleri(
    @Body() body: GaleriJurusanDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      // console.log(body);
      body.path = this.pathJurusan;
      body.galeri.map((item, key) => {
        item.file = files[key].filename;
      });

      await this.masterJurusanService.createGaleri(body).catch(error => {
        throw error;
      })

      return {
        message: 'Berhasil menyimpan data.',
        statusCode: 201,
        data: body,
      };
    } catch (error) {
      throw error;
    }
  }


  @Post('struktur')
  @UseInterceptors(AnyFilesInterceptor())
  async createStruktur(
    @Body() body: StrukturDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      // console.log(body);
      body.path = this.pathJurusan;
      body.struktur.map((item, key) => {
        item.file = files[key].filename;
      });

      await this.masterJurusanService.createStruktur(body)

      return {
        message: 'Berhasil menyimpan data.',
        statusCode: 201,
        data: body,
      };
    } catch (error) {
      throw error;
    }
  }

  // @UseInterceptors(FilesInterceptor('struktur[]'))
  // async createStrukturRiset(
  //   @Body() data: { struktur: StrukturRiset[] },
  //   @UploadedFiles() files: Array<Express.Multer.File>
  // ) {
  //   try {
  //     // Proses data, menggabungkan data dari @Body() dan @UploadedFiles()
  //     // Contoh sederhana menggabungkan data:
  //     data.struktur.forEach((struktur, index) => {
  //       struktur.files = [files[index]];
  //     });

  //     console.log(data); // Untuk debugging

  //     // Simpan data ke database atau lakukan proses lainnya

  //     return {
  //       message: 'Berhasil menyimpan data.',
  //       statusCode: 201,
  //       data,
  //     };
  //   } catch (error) {
  //     // Handle error
  //     console.error(error);
  //     throw new HttpException('Terjadi kesalahan', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Get()
  findAll() {
    return this.masterJurusanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterJurusanService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMasterJurusanDto: UpdateMasterJurusanDto) {
  //   return this.masterJurusanService.update(+id, updateMasterJurusanDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterJurusanService.remove(+id);
  }
}
