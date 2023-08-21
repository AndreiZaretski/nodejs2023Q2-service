import {
  ConsoleLogger,
  Injectable,
  LogLevel,
  LoggerService,
} from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  logLevel: number;
  logFileSize: number;

  constructor() {
    super();
    this.logLevel = +(process.env.LOG_LEVEL || 2);
    this.logFileSize = +(process.env.LOG_FILE_SIZE || 18);
    this.log('EnvFiles', this.logLevel, this.logFileSize);
    this.options = { logLevels: this.logLevelArray(this.logLevel) };
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
  }
  error(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    console.error(
      '\x1b[1m\x1b[31m' + 'error',
      '\x1b[1m\x1b[32m',
      message,
      ...optionalParams,
      '\x1b[0m',
    );
  }
  warn(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    console.warn(
      '\x1b[1m\x1b[33m' + 'warn',
      '\x1b[1m\x1b[32m',
      message,
      ...optionalParams,
      '\x1b[0m',
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    console.debug(
      '\x1b[1m\x1b[35m' + 'debug',
      '\x1b[1m\x1b[32m',
      message,
      ...optionalParams,
      '\x1b[0m',
    );
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
}
