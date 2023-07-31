import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
// import { config } from 'dotenv';
// config();

async function bootstrap() {
  const PORT = Number(process.env.PORT);
  const app = await NestFactory.create(AppModule);

  try {
    const yamlFile = await readFile(
      resolve(__dirname, '..', 'doc', 'api.yaml'),
      'utf8',
    );
    const yamlObject: any = yaml.load(yamlFile);
    //as Omit<OpenAPIObject, 'paths'>;
    //const document = SwaggerModule.createDocument(app, yamlObject);
    SwaggerModule.setup('doc', app, yamlObject);
  } catch (e) {
    console.error(e.message);
  }

  await app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
}
bootstrap();
