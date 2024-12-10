import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Res } from '@nestjs/common';
import { ProfileGuruService } from './profile_guru.service';
import { CreateProfileGuruDto } from './dto/create-profile_guru.dto';
import { UpdateProfileGuruDto } from './dto/update-profile_guru.dto';
import { UserService } from '../user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Role } from '../user/dto/user.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { HelperFun } from 'src/helper/helper_fun';

@Controller('profile-guru')
export class ProfileGuruController {
  constructor(
    private readonly userService : UserService,
    private readonly profileGuruService: ProfileGuruService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
  @Post()
  async create(@Body() body: CreateProfileGuruDto, @Res() res) {
    try {
      if (body.password !== body.password_confirmation) {
        throw new BadRequestException('Password Confirmation is not match!')
    }

    // check if user existing
    const exist = await this.userService.existingUser(body);
    if (exist) {
        throw new BadRequestException('Email or Phone Number already exists!')
    }
    // menghapus password_confirmation karena tidak ada field pada database
    delete body.password_confirmation;
    
    body.created_at = new Date()
    body.updated_at = new Date()

    let data = await this.profileGuruService.create(body);

    // menghapus data password yang akan dikirim ke response agar tidak terlihat user
    delete data.user.password
    return res.send(201,{
        message: "Berhasil menyimpan data.",
        statusCode : 201,
        data : HelperFun.toObject(data)
    });
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
  async findAll(@Res() res) {
    try {
      const data = await this.profileGuruService.findAll();
      return res.send(201,{
        message: "Berhasil mengambil data.",
        statusCode : 201,
        data : HelperFun.toObject(data)
    });
    } catch (error) {
      throw error
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('superadmin', 'admin')
  @Get(':id')
  async findOne(@Param('id') id:number, @Res() res) {
    try {
      const data = await this.profileGuruService.findOne(+id);
      return res.send({
        message: "Berhasil mengambil data.",
        statusCode : 201,
        data : HelperFun.toObject(data)
    });     
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileGuruDto: UpdateProfileGuruDto) {
    return this.profileGuruService.update(+id, updateProfileGuruDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileGuruService.remove(+id);
  }
}
