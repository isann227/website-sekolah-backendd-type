import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {

  constructor(private dbService: PrismaService) { }

  async create(data) {
    return await this.dbService.banner.create({
      data:data
    });
  }

  async findActive(params? : any) {
    console.log(params)
    try {
      let dataOutput = {
        listData: [],
        page:  Number(params.page),
        perpage: Number(params.perpage),
        currentPage: Number(params.page),
        totalPage: Number(params.page),
        totalData: 0,
        search: params.search,
      }

      if (!params.search) {
        params.search = '%';
      }

      const [data, count] = await Promise.all([
        this.dbService.banner.findMany({
          where: {
            display_st : "display",
            OR: [
              {
                judul: {
                  contains: params.search
                }
              }
            ]
          },
          skip: (dataOutput.page - 1) * dataOutput.perpage,
          take: dataOutput.perpage,
          orderBy: {
            created_at: 'desc'
          }
        }),
        this.dbService.banner.count({
          where: {
            display_st : "display",
            OR: [
              {
                judul: {
                  contains: params.search
                }
              }
            ]
          },
          orderBy: {
            created_at: 'desc'
          }
        }),
      ])

      dataOutput.listData = data;
      dataOutput.totalData = count;
      dataOutput.totalPage =  Math.ceil(count / dataOutput.perpage);
      return dataOutput;

    } catch (error) {
      console.log(error.stack)
      throw new BadGatewayException();
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
