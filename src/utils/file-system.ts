import fs from "fs";
import path from "path";
import { logLevelsList } from "../common/data";
import { LogLevels } from "../common/enums";
import { DateFormats } from "./date-formats";

export class FileSystem {
  public static async writeLog(logMessage: string, logLevel: LogLevels) {

    const logsPath = path.resolve("logs");

    if (!fs.existsSync(logsPath)) {
      fs.mkdir(logsPath, () => { });
    }

    const logLevelName = logLevelsList[logLevel];
    const directoryPath = path.join(logsPath, logLevelName);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdir(directoryPath, () => { });
    }

    const date = DateFormats.formatCurrentDate();
    const fileName = `log_${date}.log`;

    const filePath = path.join(directoryPath, fileName);

    const stream = fs.createWriteStream(filePath, {
      flags: "a+"
    });

    stream.write(logMessage + "\n");
  }
}