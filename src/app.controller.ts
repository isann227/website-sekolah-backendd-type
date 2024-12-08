import { Body, Controller, Get, Post, Request, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user/user.service';
import { RateLimiterGuard,RateLimit } from 'nestjs-rate-limiter';
import { HelperFun } from './helper/helper_fun';
import { LoginDto } from './auth/dto/login.dto';
import { AuthService } from './auth/auth.service';


// @SkipThrottle()
@Controller()
export class AppController {
  constructor(private userService:UserService, private autService:AuthService) {}

  @Get('/')
 async welcome(){
  return {
    success: true,
    message: "Selamat Datang !"
  };
 }

  // @HttpCode(HttpStatus.OK)
  @UseGuards(RateLimiterGuard)
  @RateLimit({ omitResponseHeaders: true, logger: true,  points: 3, duration: 60, errorMessage: 'Anda terlalu sering melakukan request login !' })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
        let token = await this.autService.signIn(loginDto);
        return res.status(200).json({
          message: "Login Sukses",
          statusCode : 200,
          data : token
      })
    }
      
  }