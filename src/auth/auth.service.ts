import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HelperFun } from 'src/helper/helper_fun';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    data: any,
  ): Promise<{ access_token: string }> {
    try {
      let user = await this.usersService.findEmail(data.email);
      console.log(user.password, data.password);
      const isMatch = await bcrypt.compare(data.password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      user =  HelperFun.toObject(user)
      const payload = { id: user.id,  role:user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      }; 
    } catch (error) {
      throw new UnauthorizedException(); 
    }
  }

}