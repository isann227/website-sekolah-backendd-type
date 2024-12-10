import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RequestLoggerMiddleware } from '../middleware/request-logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { BlockIPMiddleware } from 'middleware/block-ip.middleware';
import { RateLimiterModule } from 'nestjs-rate-limiter'
import { OssModuleModule } from './oss_module/oss_module.module';
import { AuthService } from './auth/auth.service';
import { BannerModule } from './admin/banner/banner.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './admin/user/user.module';
import { ProfileGuruModule } from './admin/profile_guru/profile_guru.module';



@Module({
  imports: [PrismaModule, UserModule, RateLimiterModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
      OssModuleModule,
      BannerModule,
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads',
      }),
      ProfileGuruModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {
  // let's add a middleware on all routes
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  // }
}
