import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
  email: string;

  @IsNotEmpty()
  no_hp: string;
  id: number;
  name: string;
}
