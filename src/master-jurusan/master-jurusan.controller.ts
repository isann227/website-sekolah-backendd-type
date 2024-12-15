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
  UseGuards,
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
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('jurusan')
export class MasterJurusanController {

  private pathJurusan = 'uploads/jurusan/image/'
  constructor(private readonly masterJurusanService: MasterJurusanService) {
  }

  @Post()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('superadmin', 'admin')
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() data: CreateDataDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    try {
      data.logo = file.filename;
      data.path_logo = this.pathJurusan;
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

  @Patch(':id')
    // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('superadmin', 'admin')
  @UseInterceptors(
    FileInterceptor('logo')
  )
  async update(
    @Param('id') id : number,
    @Body() data: CreateDataDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    try {
      if (file) {
        data.logo = file.filename;
        data.path_logo = this.pathJurusan; 
      }
      await this.masterJurusanService.update(id, data);
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
