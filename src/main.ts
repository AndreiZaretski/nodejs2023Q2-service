import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { CustomLogger } from './logger/logger.service';
import { CustomExceptionFilter } from './logger/exeption-filter';
import { LoggerInterceptor } from './logger/logger.interceptor';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);

  try {
    const yamlFile = await readFile(
      resolve(__dirname, '..', 'doc', 'api.yaml'),
      'utf8',
    );
    const yamlObject: any = yaml.load(yamlFile);

    SwaggerModule.setup('doc', app, yamlObject);
  } catch (e) {
    console.error(e.message);
  }
  const logger = app.get(CustomLogger);

  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerInterceptor(logger));
  app.useGlobalFilters(new CustomExceptionFilter(logger));

  process.on('uncaughtException', (err, origin) => {
    logger.error(
      'Uncaught exception:',
      err.message,
      'origin:',
      origin,
      'error',
    );
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  await app.listen(PORT, () => {
    logger.log(`Server listen on port ${PORT}`);
  });

  //For check uncaughtException listener uncomment the code below

  // setTimeout(() => {
  //   throw new Error('Uncaught exception');
  // });

  //For check unhandledRejection listener uncomment the code below

  // const rejectedPromise = new Promise((resolve, reject) => {
  //   reject(new Error('This is a rejected promise'));
  // });
  // rejectedPromise.then((value) => {
  //   value;
  // });

  // logger.error('error');
  // logger.warn('warn');
  // logger.log('log');
  // logger.verbose('verbose');
  // logger.debug('debug');
}
bootstrap();
