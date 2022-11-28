import { CorsOptions } from "cors";
import { NotAllowed } from "../api/errors/server-errors";
import { Enviroment } from "./enviroment-vars";

export const corsFilter: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (!Enviroment.ALLOWED_ORIGINS.includes(origin)) {
      return callback(new NotAllowed());
    }

    if (Enviroment.ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
  },
  optionsSuccessStatus: 200
}