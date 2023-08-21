import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private customLogger: CustomLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const now = Date.now();

    const method = request.method;
    const url = request.url;
    const query = request.query;
    const reqBody = request.body;

    return next.handle().pipe(
      tap(() => {
        const statusCode = response.statusCode;
        //response.on('finish', () => {
        //const respBody = response.locals.respBody;
        // const message = `
        //   \x1b[32m Request: \x1b[0m\n
        //     \x1b[32m method: ${method}\x1b[0m \n
        //     \x1b[32m url: ${url} ${JSON.stringify(query)} \x1b[0m  \n
        //     \x1b[32m body:${JSON.stringify(reqBody)}\x1b[0m \n
        //     \x1b[32m initTime: ${now}\x1b[0m\n
        //   \x1b[32m Response: \x1b[0m\n
        //     \x1b[32m statusCode: ${statusCode}\x1b[0m \n
        //     \x1b[32m finishTime: ${Date.now()}\x1b[0m \n`;

        const message = JSON.stringify({
          request: {
            method: method,
            url: url,
            query: query,
            body: reqBody,
            initTime: now,
          },
          response: {
            statusCode: statusCode,
            finishTime: Date.now(),
          },
        });

        this.customLogger.log(message);
        //});
      }),
    );
  }
}
