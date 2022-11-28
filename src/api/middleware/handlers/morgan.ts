import morgam, { StreamOptions } from "morgan";
import { Logger } from "../../../config/logger";

const stream: StreamOptions = {
  write: (str) => Logger.http(str)
}

const morganMiddleware = morgam(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream
  }
);

export default morganMiddleware;