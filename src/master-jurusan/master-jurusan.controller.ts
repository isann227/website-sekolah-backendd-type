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
  BadRequestException,
  Req,
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
import { StrukturDtoUpdate } from './dto/struktur-jurusan-update.dto';
import { GaleriJurusanDtoUpdate } from './dto/galeri-jurusan-update.dto';

@Controller('jurusan')
export class MasterJurusanController {

  private pathJurusan = 'uploads/jurusan/image/'
  constructor(private readonly masterJurusanService: MasterJurusanService) {
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
  // config untuk 1 gambar saja
  @UseInterceptors(
    FileInterceptor('logo')
  )
  async create(
    @Body() data: CreateDataDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    try {
      if (!file) {
        throw new BadRequestException('Gambar wajib diisi!');
      }

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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
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
      if (file != undefined) {
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
    @Res() res,
    @Body() body: GaleriJurusanDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {

      if (!files || files.length === 0) {
        throw new BadRequestException('Gambar wajib diisi!');
      }

      if (body.galeri.length !== files.length) {
        throw new BadRequestException('Jumlah file tidak sesuai dengan data galeri!');
      }

      // console.log(body);
      body.path = this.pathJurusan;
      body.galeri.forEach((item, key) => {
        item.file = files[key].filename;
      });

      await this.masterJurusanService.createGaleri(body).catch(error => {
        throw error;
      })

      return res.send(201,{
        message: "Berhasil menyimpan data.",
        statusCode : 201,
        data : HelperFun.toObject(body)
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
  @Post('struktur')
  @UseInterceptors(AnyFilesInterceptor())
  async createStruktur(
    @Res() res,
    @Body() body: StrukturDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      if (!files || files.length === 0) {
        throw new BadRequestException('Gambar wajib diisi!');
      }

      if (body.struktur.length !== files.length) {
        throw new BadRequestException('Jumlah file tidak sesuai dengan data struktur!');
      }

      body.path = this.pathJurusan;
      body.struktur.forEach((item, key) => {
        console.log(files[key])
        if (files[key]) {
          item.file = files[key].filename;          
        }
      });

      await this.masterJurusanService.createStruktur(body)

      return res.send(201,{
        message: "Berhasil menyimpan data.",
        statusCode : 201,
        data : HelperFun.toObject(body)
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
  @Patch('struktur/:id')
  @UseInterceptors(FileInterceptor('file'))

  // async updateStruktur(
  //   @Param('id') id: number,
  //   @Res() res,
  //   @Body() body: StrukturDtoUpdate,
  //   @UploadedFiles() files: Express.Multer.File[],
  // ) {
  //   try {
  //     console.log(files)
  //     body.path = this.pathJurusan;
  //     body.struktur.forEach((item, key) => {
  //       if (files && files[key]) {
  //           item.file = files[key].filename;
  //           console.log(`Mengisi file untuk item dengan index ${key}: ${files[key].filename}`);
  //       }
  //     });

  //     await this.masterJurusanService.updateStruktur(body)

  //     return res.send(200,{
  //       message: "Berhasil menyimpan data.",
  //       statusCode : 200,
  //       data : HelperFun.toObject(body)
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Patch('struktur/:id')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('superadmin', 'admin')
  // @UseInterceptors(AnyFilesInterceptor())
  // async updateGaleri(
  //   @Res() res,
  //   @Param('id') id: number,
  //   @Body() body: GaleriJurusanDtoUpdate,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  // ) {
  //   try {
  //     body.path = this.pathJurusan;
  //     body.galeri.map((item, key) => {
  //       if (files) {
  //           item.file = files[key].filename;
  //       }
  //     });

  //     await this.masterJurusanService.updateGaleri(body).catch(error => {
  //       throw error;
  //     })

  //     return res.send(200,{
  //       message: "Berhasil menyimpan data.",
  //       statusCode : 200,
  //       data : HelperFun.toObject(body)
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res, @Req() req) {
    try {
      const data = await this.masterJurusanService.findOne(id);      
      return res.send(200,{
        message: "Berhasil mengambil data.",
        statusCode : 200,
        data : HelperFun.toObject(data)
      })
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAll(@Res() res, @Req() req){
    try {
      let {search, page, perpage} = req.query;
       const data = await this.masterJurusanService.findAll(search != undefined ? search : null, page != undefined ? parseFloat(page) : 1, perpage != undefined ? parseFloat(perpage) : 10);      
        return res.send(200,{
          message: "Berhasil mengambil data.",
          statusCode : 200,
          data : HelperFun.toObject(data)
        })
      } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      await this.masterJurusanService.remove(+id);
      return res.send(200,{
        message: "Berhasil menghapus data.",
        statusCode : 200,
      });
    } catch (error) {
      throw error;
    }
  }
}
