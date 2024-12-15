import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString, Matches, MinLength, Validate, ValidateNested } from "class-validator";
import { OrgStructureDto } from "./craete-master-jurusan-galeries.dto";

export class StrukturJurusanDto {
    @Type(() => Number) // Automatically converts the input to a number
    @IsNumber()
    jurusan_id: number;
      
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => Number) // Automatically converts the input to a number
    @IsInt({ each: true })
    order: number[];
    
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true }) // Each element in the array must be a string
    jabatan: string[];
  

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true }) // Each element in the array must be a string
    nama: string[];

    
    @IsArray()
    @IsOptional()
    filename : string[]
    @IsOptional()
    path : string
}
