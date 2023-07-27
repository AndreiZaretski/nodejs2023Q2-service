import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const PORT = process.env.PORT;
  console.log('env port', process.env.PORT);
  console.log('port ', PORT);
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
}
bootstrap();
