import { Controller, Get, Post, Body, Put, Param, Patch, ParseIntPipe, UsePipes, ValidationPipe, Delete, UseGuards, SetMetadata, Req, Res, BadGatewayException, BadRequestException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { HelperFun } from 'src/helper/helper_fun';
import { UploadFotoDto } from './dto/upload-foto-dto';
import { Response as ExResponse } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { PaginationDto } from 'src/helper/pagionation.dto';
@Controller('user')
// @UseGuards(AuthGuard)
// @UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('superadmin', 'admin')
    async create(@Res() res, @Body() body : CreateUserDto){
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

            let data = await this.userService.createAuth(body);

            // menghapus data password yang akan dikirim ke response agar tidak terlihat user
            delete data.password
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
    async getAll(@Res() res, @Req() req, @Query() query : PaginationDto){
        try {
            const { page, limit } = query;
            const data = await this.userService.findAllPagin(page, limit);
            return res.send({
                message: "Berhasil mengambil data.",
                statusCode : 200,
                data : HelperFun.toObject(data)
            });
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('superadmin', 'admin')
    async update(@Res() res, @Body() body : CreateUserDto, @Param('id') id: number){
        try {
            if (body.password !== body.password_confirmation) {
                throw new BadRequestException('Password Confirmation is not match!')
            }
            // check if user existing selain data dia sendiri
            const exist = await this.userService.existingUserExcludeId(id, body);
            if (exist) {
                throw new BadRequestException('Email or Phone Number already exists!')
            }
            // menghapus password_confirmation karena tidak ada field pada database
            delete body.password_confirmation;
            body.updated_at = new Date()
            let data = await this.userService.updateData(id, body)
            return res.send({
                message: "Berhasil menyimpan data.",
                statusCode : 200,
                data : HelperFun.toObject(data)
            });
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('superadmin', 'admin')
    async getData(@Res() res, @Req() req,  @Param('id') id : number){
        try {
            let data = await this.userService.findOne(id);
            delete data.password;
            return res.send({
                message: "Berhasil mengambil data.",
                statusCode : 200,
                data : HelperFun.toObject(data)
            })
        } catch (error) {
            console.log(error);
           throw error;
        }
    }

    @Delete('/:id')
    async deleteUser(@Res() res,@Param('id', ParseIntPipe) id){
        try {
            await this.userService.deleteData(id);
            return res.send({
                message: "Berhasil menghapus data.",
                statusCode : 200,
                data : null
            });
        } catch (error) {
            throw error
        }
    }
}
