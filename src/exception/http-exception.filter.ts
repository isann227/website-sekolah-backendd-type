import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status =
        exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
  
      const exceptionResponse: any = exception.getResponse();
      let message = exceptionResponse;
  
      if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
        message = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message
          : [exceptionResponse.message];
      } else if (typeof exceptionResponse === 'string') {
        message = [exceptionResponse];
      }
  
      response.status(status).json({
        statusCode: status,
        error: HttpStatus[status],
        message,
      });
    }
  }
  