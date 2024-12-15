import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Res, HttpException, HttpStatus, ConsoleLogger } from '@nestjs/common';
import { MasterJurusanService } from './master-jurusan.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { diskStorage } from 'multer';
import { CreateDataDto } from './dto/create-master-jurusan.dto';
import { HelperFun } from 'src/helper/helper_fun';
import { GaleriJurusanDto } from './dto/galeri-jurusan-dto.dto';

@Controller('jurusan')
export class MasterJurusanController {
  constructor(private readonly masterJurusanService: MasterJurusanService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img_jurusan', {
    storage: multer.diskStorage({
      destination: './uploads/jurusan/image', // Directory to store images
      filename: (req, file, cb) => {
        // Generating a unique filename based on UUID
        const filename = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename); // Save the file with the generated name
      },
    }),
  })
) // Handling the file upload
  async create(@Body() data : CreateDataDto, @UploadedFile() file: Express.Multer.File, @Res() res) {
    try {
      const file_path = '/uploads/jurusan/image';
      data.filename = file.filename
      data.path = file_path
      await this.masterJurusanService.create(data);
       return res.send(201,{
          message: "Berhasil menyimpan data.",
          statusCode : 201,
          data : HelperFun.toObject(data)
      });
    } catch (error) {
      console.warn(error)      
    }
    // return this.masterJurusanService.create(createMasterJurusanDto);
  }


  @Post('galeri_jurusan')
  @UseInterceptors(
    FilesInterceptor('img_galeri_jurusan', 2, {
      storage: multer.diskStorage({
        destination: './uploads/jurusan/galeri/image', // Directory to store images
        filename: (req, file, cb) => {
          // Generating a unique filename based on UUID
          const filename = `${Date.now()}${path.extname(file.originalname)}`;
          cb(null, filename); // Save the file with the generated name
        },
      }),
    }),
  )
  async createGaleri(@Body() data : GaleriJurusanDto, @UploadedFiles() files: Array<Express.Multer.File>, @Res() res) {
    try {
      console.log(data);
      // Process the uploaded files here
      data.filename = []
      data.path = '/uploads/jurusan/galeri/image'
      files.map((item,key) => {
        data.filename.push(item.filename)   
      })
      await this.masterJurusanService.createGaleri(data)

      return res.send(201,{
          message: "Berhasil menyimpan data.",
          statusCode : 201,
          data : HelperFun.toObject(data)
      });

    } catch (error) {
      // Handle errors, including unexpected field errors
      if (error.message.includes('Unexpected field')) {
        throw new HttpException('Invalid request data. Please check field names and data format.', HttpStatus.BAD_REQUEST);
      } else {
        // Handle other errors
        throw error;
      }
    }
    // return this.masterJurusanService.create(createMasterJurusanDto);
  }


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
