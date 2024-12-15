import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString, Matches, MinLength, Validate, ValidateNested } from "class-validator";
import { OrgStructureDto } from "./craete-master-jurusan-galeries.dto";

export class GaleriJurusanDto {
    @IsInt()
    jurusan_id: number;
  
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true }) // Each element in the array must be a string
    judul: string[];
  
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true }) // Each element in the array must be a string
    deskripsi: string[];

    @IsArray()
    @IsOptional()
    filename : string[]
    @IsOptional()
    path : string
  }
