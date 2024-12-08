import { Injectable, Param, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private dbService: PrismaService){}
    
    async findAll(){
        // jika ditampilkan dalam query = "select a.*, b.* from user a inner join role on a.role_id = b.id where b.platform_induk_st = 1;
        return await this.dbService.users.findMany({
        });
    }

    async findDetail(id: number){
        // jika ditampilkan dalam query = "select a.*, b.* from user a inner join role on a.role_id = b.id where b.platform_induk_st = 1;
        return await this.dbService.users.findMany({
            where: {
                id: id
              },
        });
    }

    async findUserPlatform(){
        // jika ditampilkan dalam query = "select a.*, b.* from user a inner join role on a.role_id = b.id where b.platform_induk_st = 1;
        return await this.dbService.users.findMany(
            {
                }
        );
    }

    async findUserMitra(){
        // jika ditampilkan dalam query = "select a.*, b.* from user a inner join role on a.role_id = b.id where b.platform_induk_st = 1;
        return await this.dbService.users.findMany(
            {
                }
        );
    }

    /**
     * 
     * @param data 
     */
    async createData(data : any){
        // console.log(data);
        return await this.dbService.users.create({
            data
        })
    }

    async updateData(id: number, data : any){
        // console.log(data);
        return await this.dbService.users.update({
            data, where:{id}
        })
    }

    async deleteData(id: number){
        return await this.dbService.users.delete({where:{id}
        })
    }

    // find by email
    async findOne(id:number){
        return await this.dbService.users.findFirst({
            where: {
              id: id,
            }
          })
    }
     // find by email
     async findEmail(email: string){
        return await this.dbService.users.findUnique({
            where: {
                email: email,
            },
        })
    }

    async getReferal(id: any){
        return await this.dbService.users.findFirst({
            where: {
                id: id
            }
        }).then(async (res) => {
            
            return await this.dbService.users.findMany({
                where: {
                    referal: res?.referal_id
                },
                orderBy: {
                    created_at: "desc"
                }
            })
        }).catch((err) => {
            return [];
        })
    }
    async getAllUserNoReferal(){
        return await this.dbService.users.findMany({
            where: {
                referal_id: null
            }
        })
    }
    async checkReferalCode(refId: any = null){
        return await this.dbService.users.findMany({
            where: {
                referal_id: refId
            }
        })
    }
    
}
