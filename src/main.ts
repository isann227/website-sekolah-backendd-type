import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file'; 
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from "body-parser";
import rateLimit from 'express-rate-limit';
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
import * as express from 'express';
import { join } from 'path';
import { HttpExceptionFilter } from './exception/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // file on daily rotation (error only)
        new transports.DailyRotateFile({
       // %DATE will be replaced by the current date
          filename: `logs/%DATE%-error.log`, 
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false, // don't want to zip our logs
          maxFiles: '30d', // will keep log until they are older than 30 days
        }),
        // same for all levels
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d',
        }),
        new transports.Console({
         format: format.combine(
           format.cli(),
           format.splat(),
           format.timestamp(),
           format.printf((info) => {
             return `${info.timestamp} ${info.level}: ${info.message}`;
           }),
          ),
      }),
      ],
    }),
  });

  // const limiter = rateLimit({
  //   windowMs: 60 * 60 * 1000, // Durasi dalam milidetik (1 jam)
  //   max: 3, // Jumlah percobaan login yang diizinkan
  //   message: 'Alamat IP Anda diblokir karena mencoba melewati throttle sebanyak 3 kali.',
  // });

  // app.use(limiter);

  // menggunakan multithreads-mode
  if(cluster.isMaster){
    console.log('Master '+process.pid+' berjalan');
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log('worker '+worker.process.pid+' mati');
    })
  }else{

    // Set static assets directory for serving images
    app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
    // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // Enables automatic transformation
        whitelist: true, // Strips unknown properties
        forbidNonWhitelisted: true, // Throws error for unknown properties
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(bodyParser.json({limit: "50mb"}))
    app.use(bodyParser.urlencoded())
    app.setGlobalPrefix('/api/');
    await app.listen(3001);
  }



}

bootstrap();

