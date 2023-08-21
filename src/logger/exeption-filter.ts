import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { CustomLogger } from './logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private customLogger: CustomLogger) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;

      response.status(status).json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });

      this.customLogger.error(
        JSON.stringify({
          statusCode: status,
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url,
        }),
        //exception.stack,
      );
      //this.customLogger.error(exception.message, exception.stack);
    } else {
      response.status(500).json({
        statusCode: 500,
        message: 'Something went wrong. We are already working on this issue.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });

      this.customLogger.error(
        JSON.stringify({
          statusCode: 500,
          message:
            'Something went wrong. We are already working on this issue.',
          timestamp: new Date().toISOString(),
          path: request.url,
        }),
      );
      //this.customLogger.error(exception.message, exception.stack);
    }
  }
}
