import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { CustomLogger } from './logger/logger.service';
import { CustomExceptionFilter } from './logger/exeption-filter';

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
  app.useGlobalFilters(new CustomExceptionFilter(logger));

  await app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
}
bootstrap();
