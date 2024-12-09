import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UserModule } from 'src/admin/user/user.module';
import { UserService } from 'src/admin/user/user.service';
@Module({
  imports: [
    UserModule,
  ],
  providers: [AuthService, UserService],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

  }
}
