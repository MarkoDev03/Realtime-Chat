import morgam, { StreamOptions } from "morgan";
import { Logger } from "../../../config/logger";

const stream: StreamOptions = {
  write: (str) => Logger.http(str.replace('\n', ""))
}

const morganMiddleware = morgam(
  ":method :url [:status] :response-time ms",
  {
    stream
  }
);

export default morganMiddleware;