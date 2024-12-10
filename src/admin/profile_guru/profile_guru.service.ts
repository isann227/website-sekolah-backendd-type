import { Injectable } from '@nestjs/common';
import { CreateProfileGuruDto } from './dto/create-profile_guru.dto';
import { UpdateProfileGuruDto } from './dto/update-profile_guru.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { jenis_user } from '../user/dto/user.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileGuruService {

  private saltOrRounds : number

  constructor(
    private dbService : PrismaService
  ){
     this.saltOrRounds = 10;
  }

  async create(data: CreateProfileGuruDto) {
    try {
        return this.dbService.$transaction(async (prisma) => {

          const param_user = {
            name: data.name,
            email: data.email,
            username: data.username,
            phone: data.phone,
            password: await bcrypt.hash(data.password, this.saltOrRounds),
            alamat: data.alamat,
            role: data.role,
            jenis_user : jenis_user["guru"]
          }

          // Create the user
          const user = await this.dbService.users.create({
            data: param_user
          });
  
          const param_profile_guru = {
            nip : data.nip,
            tempat_lahir : data.tempat_lahir,
            tgl_lahir : data.tgl_lahir,
            golongan : data.golongan,
            jenis_pns : data.jenis_pns
          }
    
          // Create the profile linked to the user
          const profile = await this.dbService.profile_guru.create({
            data: {
              ...param_profile_guru,
              user_id: user.id, // Associate the profile with the user
            },
          });
    
          return { user, profile };
        });

        console.log(data);      
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.dbService.profile_guru.findMany({
        include : {
          users : true
        }
      });
    } catch (error) {
        throw error
    }
  }

  async findOne(id: number) {
    try {
      return await this.dbService.profile_guru.findUnique({
        where : {
          user_id : id,
        },
        include : {
          users : true
        }
      });
    } catch (error) {
        throw error
    }
  }

  update(id: number, updateProfileGuruDto: UpdateProfileGuruDto) {
    return `This action updates a #${id} profileGuru`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileGuru`;
  }
}
