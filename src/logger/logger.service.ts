import {
  ConsoleLogger,
  Injectable,
  LogLevel,
  LoggerService,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { mkdirSync } from 'fs';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  private logLevel: number;
  private logFileSize: number;
  private logFileName: string = 'log';
  private errorFileName: string = 'error';
  private fileEx: string = '.txt';

  constructor() {
    super();
    this.logLevel = +(process.env.LOG_LEVEL || 2);
    this.logFileSize = +(process.env.LOG_FILE_SIZE || 18) * 1024;

    this.options = { logLevels: this.logLevelArray(this.logLevel) };
    this.log('EnvFiles', this.logLevel, this.logFileSize);

    mkdirSync(path.resolve('logs'), { recursive: true });
  }

  log(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('log')) {
      return;
    }
    console.log(
      '\x1b[1m\x1b[32m' + 'log\n',
      '\x1b[1m\x1b[32m',
      message,
      ...optionalParams,
      '\x1b[0m',
    );

    this.writeLogsFile(this.logFileName, message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    console.error(
      '\x1b[1m\x1b[31m' + 'error',
      '\x1b[1m\x1b[31m',
      message,
      ...optionalParams,
      '\x1b[0m',
    );
    this.writeLogsFile(this.errorFileName, message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    console.warn(
      '\x1b[1m\x1b[33m' + 'warn',
      '\x1b[1m\x1b[33m',
      message,
      ...optionalParams,
      '\x1b[0m',
    );
    this.writeLogsFile(this.logFileName, message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    console.debug(
      '\x1b[1m\x1b[35m' + 'debug',
      '\x1b[1m\x1b[35m',
      message,
      ...optionalParams,
      '\x1b[0m',
    );
    this.writeLogsFile(this.logFileName, message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('verbose')) {
      return;
    }
    console.log(
      '\x1b[1m\x1b[32m' + 'verbose',
      '\x1b[1m\x1b[32m',
      message,
      ...optionalParams,
      '\x1b[0m',
    );
    this.writeLogsFile(this.logFileName, message, ...optionalParams);
  }

  private logLevelArray(level: number): LogLevel[] {
    if (level === 0) {
      return ['error'];
    }
    if (level === 1) {
      return ['error', 'warn'];
    }
    if (level === 2) {
      return ['error', 'warn', 'log'];
    }
    if (level === 3) {
      return ['error', 'warn', 'log', 'debug'];
    }
    if (level === 4) {
      return ['error', 'warn', 'log', 'debug', 'verbose'];
    }

    return ['error', 'warn', 'log'];
    //return undefined;
  }

  private async writeLogsFile(
    fileName: string,
    message: any,
    ...optionalParams: any[]
  ) {
    await this.rotateFile(fileName);

    const data = this.createBufferData(message, ...optionalParams);
    try {
      await fs.appendFile(path.resolve('logs', fileName + this.fileEx), data);
    } catch (err) {
      throw err;
    }
  }

  private createBufferData(message: any, ...optionalParams: any[]) {
    return Buffer.concat([
      Buffer.from(new Date().toISOString() + '\n', 'utf8'),
      Buffer.from(message + '\n', 'utf8'),
      ...optionalParams.map((param: any) => Buffer.from(param + '\n', 'utf8')),
    ]);
  }

  private async rotateFile(fileName: string) {
    try {
      const stats = await fs.stat(path.resolve('logs', fileName + this.fileEx));
      if (stats.size > this.logFileSize) {
        //console.log('sizee', stats.size, this.logFileSize);
        const newName = fileName + '-' + Date.now();
        // await fs.rename(path.resolve('logs', fileName), newName);
        // await fs.writeFile(path.resolve('logs', fileName), '');
        await fs.copyFile(
          path.resolve('logs', fileName + this.fileEx),
          path.resolve('logs', newName + this.fileEx),
        );
        //await fs.unlink(path.resolve('logs', fileName));
        await fs.writeFile(path.resolve('logs', fileName + this.fileEx), '', {
          flag: 'w',
        });
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        //console.log('grtt', err.code, err.message);
        return;
      }
      throw err;
    }
  }
}
