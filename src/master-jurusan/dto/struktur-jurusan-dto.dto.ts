import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString, Matches, MinLength, Validate, ValidateNested } from "class-validator";
import { OrgStructureDto } from "./craete-master-jurusan-galeries.dto";
export class StrukturDto {
    @IsOptional()
    path: string;
    
    @Type(() => Number) // Automatically converts the input to a number
    @IsNumber()
    jurusan_id: number;

    @IsArray()
    @ValidateNested({ each: true }) // Validasi setiap item dalam array
    @Type(() => StrukturItemDto)   // Transform objek di dalam array ke StrukturItemDto
    struktur: StrukturItemDto[];
  }
  
  export class StrukturItemDto {
    @Type(() => Number) // Automatically converts the input to a number
    @IsNumber()
    order: number;
    
    @IsString()
    nama: string;
  
    @IsString()
    jabatan: string;
  
    @IsOptional()
    file: string;
  }
