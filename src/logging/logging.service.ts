import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';

export const LoggingLevels = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  http: 'http',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
};

@Injectable()
export class LoggingService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const filename = path.join(__dirname, '../../logs', 'errors.log');

    const jsonFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    );

    this.logger = winston.createLogger({
      level: LoggingLevels.info,
      format: jsonFormat,
      transports: [
        new winston.transports.File({
          filename,
          level: LoggingLevels.error,
        }),

        new winston.transports.Console({
          level: LoggingLevels.info,
          format: winston.format.combine(
            jsonFormat,
            winston.format.prettyPrint(),
            winston.format.colorize({ all: true }),
          ),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.log({
      level: LoggingLevels.error,
      message: message,
      trace: trace,
    });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
