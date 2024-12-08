import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum BannerStatus {
    display = 'display',
    draft = 'draft',
  }

export class CreateBannerDto {
    @IsString()
    @IsNotEmpty()
    judul:string;

    @IsString()
    @IsNotEmpty()
    image:string;

    @IsEnum(["display", "draft"])
    display_st : BannerStatus
}
