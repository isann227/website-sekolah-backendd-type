import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString, Matches, MinLength, Validate, ValidateNested } from "class-validator";
export class GaleriJurusanDto {
    @IsOptional()
    path: string;
    
    @Type(() => Number) // Automatically converts the input to a number
    @IsNumber()
    jurusan_id: number;
  
    @IsArray()
    galeri: GaleriItemDto[];
  }
  
  export class GaleriItemDto {
    @IsString()
    judul: string;
  
    @IsString()
    deskripsi: string;
  
    @IsOptional()
    file: string;
  }
