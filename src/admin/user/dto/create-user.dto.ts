import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, Matches, MinLength, Validate } from "class-validator";
import { jenis_user, Role } from "./user.enum";

export class CreateUserDto {

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

    @IsEnum(Role)
    role : Role;

    @IsEnum(jenis_user)
    jenis_user : jenis_user;

    @IsOptional()
    created_at : Date;

    @IsOptional()
    updated_at : Date;

}
