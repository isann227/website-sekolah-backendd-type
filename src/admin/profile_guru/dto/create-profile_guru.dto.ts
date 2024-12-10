import { IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Matches, MinLength, Validate } from "class-validator";
import { jenis_user, Role } from "src/admin/user/dto/user.enum";
import { jenis_pns } from "./pegawai.enum";
import { Type } from "class-transformer";

export class CreateProfileGuruDto {

    @IsString()
    name : string;

    @IsString()
    username : string;

    @IsEmail()
    email : string;

    @IsNumber()
    phone : number;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Password must contain at least one uppercase letter and one number',
    })
    password: string;

    @IsString()
    password_confirmation: string;

    @IsString()
    alamat : string;

    @IsOptional()
    @IsEnum(Role)
    role : Role;

    @IsString()
    nip : string;

    @IsString()
    tempat_lahir : string;

    @IsDate()
    @Type(() => Date) // Transform string to Date
    tgl_lahir: Date;

    @IsOptional()
    @IsString()
    golongan : string;

    @IsOptional()
    @IsEnum(jenis_pns)
    jenis_pns : jenis_pns;

    @IsOptional()
    @IsEnum(jenis_user)
    jenis_user : jenis_user;
    
    @IsOptional()
    created_at : Date;

    @IsOptional()
    updated_at : Date;

}
