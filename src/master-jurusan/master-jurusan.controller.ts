import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Res } from '@nestjs/common';
import { MasterJurusanService } from './master-jurusan.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { CreateDataDto } from './dto/create-master-jurusan.dto';
import { HelperFun } from 'src/helper/helper_fun';

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
