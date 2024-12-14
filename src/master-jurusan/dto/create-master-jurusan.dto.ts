import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Matches, MinLength, Validate, ValidateNested } from "class-validator";
import { OrgStructureDto } from "./craete-master-jurusan-galeries.dto";

export class CreateDataDto {
    @IsString()
    nama: string;

    @IsString()
    sejarah_singkat:string

    @IsOptional()
    filename:string

    @IsOptional()
    path:string
  }