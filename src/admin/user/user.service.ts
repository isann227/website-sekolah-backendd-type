import { Injectable, Param, Body, BadGatewayException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private dbService: PrismaService){}
    
    async findAll(){
        // jika ditampilkan dalam query = "select a.*, b.* from user a inner join role on a.role_id = b.id where b.platform_induk_st = 1;
        return await this.dbService.users.findMany({
        });
    }

    async findDetail(id: number){
        // jika ditampilkan dalam query = select * from users where id = ${id};
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

    async existingUser(data:any){
        return await this.dbService.users.findFirst({
            where:{
                OR : [
                    {
                        phone : data.phone
                    },
                    {
                        email : data.email
                    }
                ]
            }
        })
    }

    async existingUserExcludeId(id : number, data: any){
        return await this.dbService.users.findFirst({
            where:{
                NOT : {
                    id : id,
                },
                OR : [
                    {
                        phone : data.phone
                    },
                    {
                        email : data.email
                    }
                ]
            }
        })
    }

    async findAllPagin(page : number, limit:number){
        try {
            const skip = (page - 1) * limit || 0;
            const [data, total] = await Promise.all([
                // isi data
                this.dbService.users.findMany({
                    skip,
                    take : limit
                }),
    
                // isi total
                this.dbService.users.count()
            ])
    
            return {
                data,
                total,
                page,
                limit,
                totalPages : Math.ceil(total / limit)
            }   
        } catch (error) {
            throw new BadGatewayException(error)
        }
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

    async createAuth(data : any){
        try {
            const saltOrRounds = 10;
            data.password = await bcrypt.hash(data.password, saltOrRounds);
            // console.log(data);
            return await this.dbService.users.create({
                data
            })            
        } catch (error) {
            console.log(error);
            throw new BadGatewayException(error);
        }
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
