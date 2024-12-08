import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService:JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<any> {
      const request = context.switchToHttp().getRequest();
      const token =this.extractTokenFromHeader(request);
      console.log(token)
      if (!token) {
        throw new UnauthorizedException();
      }
      try {

          const payload = await this.jwtService.verifyAsync(
            token
          );
          return request.headers.user = payload;
      } catch(error) {
        console.log('token tidak valid !');
        throw new UnauthorizedException();
      }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }

  }