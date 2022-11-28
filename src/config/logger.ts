import chalk from "chalk";
import { logLevelsList } from "../common/data";
import { LogLevels } from "../common/enums";
import { DateFormats } from "../utils/date-formats";
import { FileSystem } from "../utils/file-system";

export class Logger {
  public static info(logMessage: string): void {
    const message = Logger.formatLogMessage(logMessage, LogLevels.Info);

    console.log(chalk.green(message));
  }

  public static warn(logMessage: string): void {
    const message = Logger.formatLogMessage(logMessage, LogLevels.Warn);

    console.log(chalk.yellow(message));
  }

  public static http(logMessage: string): void {
    const message = Logger.formatLogMessage(logMessage, LogLevels.Http);

    console.log(chalk.magenta(message));
  }

  public static error(logMessage: string, stack?: any): void {
    const message = Logger.formatLogMessage(logMessage, LogLevels.Error, stack);

    console.log(chalk.red(message));
  }

  public static debug(logMessage: string): void {
    const message = Logger.formatLogMessage(logMessage, LogLevels.Debug);

    console.log(chalk.white(message));
  }

  private static formatLogMessage(logMessage: string, logLevel: LogLevels, stack?: any): string {
    const timestamp = DateFormats.currentDateLogFormat();
    const level = logLevelsList[logLevel];
    const message = stack ? `${logMessage}\n${stack}` : logMessage;

    const log = `${timestamp} ${level}: ${message}`;

    FileSystem.writeLog(log, logLevel)

    return log;
  }
}