import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadGatewayException, UseGuards } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { HelperFun } from 'src/helper/helper_fun';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import * as fs from 'fs';
import { join } from 'path';

@Controller('master/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async findAll(@Request() req) {
    try {
      let {page, perpage, search} = req.query;
      let params = {search: search ?? null, page:page  > 1 ? page : 1, perpage:perpage  > 1 ? perpage : 10}
      let dataOutput= await this.bannerService.findActive(params);
      return {
        statusCode : 200,
        message : "Sukses mengambil data.",
        data : HelperFun.toObject(dataOutput),
        error : null,
      } 
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
  async create(@Body() body: CreateBannerDto) {

    const mime = body.image.match(/^data:(.*?);base64,/);
    const imgbase64 = body.image.replace(/^data:image\/\w+;base64,/, '');
    const extfile = mime[1].replace('image/', '')
    const buffer = Buffer.from(imgbase64, 'base64');
    const fileName = Date.now()+'.'+extfile;
    const filePath = 'uploads/';
    // console.log(extfile);
    
    if (!fs.existsSync('uploads')){
      fs.mkdirSync('uploads', { recursive: true });
    }
    fs.writeFileSync(filePath+fileName, buffer);

     let data = {
      judul : body.judul,
      display_st : body.display_st,
      path : filePath,
      image_name : fileName,
      created_at : new Date(),
      updated_at : new Date()
     }
    // save image
    await this.bannerService.create(data);

    // return this.bannerService.create(body);
    return {
      statusCode : 201,
      message : "Sukses menyimpan data.",
      data : data,
      error : null,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id);
  }
}
