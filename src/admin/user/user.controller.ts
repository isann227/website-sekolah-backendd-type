import { Controller, Get, Post, Body, Put, Param, Patch, ParseIntPipe, UsePipes, ValidationPipe, Delete, UseGuards, SetMetadata, Req, Res, BadGatewayException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { HelperFun } from 'src/helper/helper_fun';
import { UploadFotoDto } from './dto/upload-foto-dto';
import { Response as ExResponse } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
@Controller('user')
// @UseGuards(AuthGuard)
// @UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('superadmin', 'admin')
    async create(@Body() body : CreateUserDto){
        try {
            if (body.password !== body.password_confirmation) {
                throw new BadRequestException('Password Confirmation is not match!')
            }
            console.log(body);
            // const data = await this.userService.createData(body);
            return {
                message: "Berhasil menyimpan data.",
                statusCode : 200,
                data : body
            };
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async getData(@Res() res, @Req() req){
        // console.log(req.headers.user);
        try {
            let data = await this.userService.findOne(req.headers.user.id);
            // console.log(data);
            delete data.password;
            delete data.is_logedin;
            delete data.remember_token;
            delete data.referal;

            return res.status(200).json({
                message: "Berhasil mengambil data.",
                statusCode : 200,
                data : HelperFun.toObject(data)
            })
            return data
        } catch (error) {
            HelperFun.loggingError('error-login',error.message, error.stack);
            if(error?.status != undefined && error.status == 400 || error.status == 404 ){
            return res.status(400).json({
                success: false,
                message: error.message,
                statusCode : 400  
            })
            }
            
            return res.status(502).json({
                success: false,
                message: "Jaringan Error !",
                statusCode : 502  
            })
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id){
        return await this.userService.deleteData(id);
    }
 
}
