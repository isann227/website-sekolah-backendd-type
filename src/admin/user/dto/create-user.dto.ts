import { IsEmail, IsEnum, IsNumber, IsString, Matches, MinLength, Validate } from "class-validator";
import { Role } from "./user.enum";

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
}
