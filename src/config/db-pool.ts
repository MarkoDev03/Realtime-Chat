import mongoose from "mongoose";
import { DBConnectionError } from "../api/errors/db-errors";
import { Enviroment } from "./enviroment-vars";
import { Logger } from "./logger";

export const connectToDb = () => {
  mongoose.connect(Enviroment.CONNECTION_STRING, {})
    .then(() => {
      Logger.info("Successfully connected to database.");
    })
    .catch(() => {
      throw new DBConnectionError();
    });
}