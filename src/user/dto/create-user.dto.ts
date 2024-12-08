import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
  email: string;

  @IsNotEmpty()
  no_hp: string;
  name: string;
}
