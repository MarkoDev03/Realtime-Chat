import { createServer } from "http";
import { Enviroment } from "./config/enviroment-vars";
import app from "./config/express";
import { Logger } from "./config/logger";
import { EventEmitter } from "events";
import { AppMode } from "./common/enums";
import { bootstrap } from "global-agent";
import { connectToDb } from "./config/db-pool";
import { APIError } from "./api/errors/api-error";
import { StatusCodes } from "http-status-codes";

const startServer = () => {

  Logger.warn("Starting up...");

  const server = createServer(app);

  const port = Enviroment.PORT || 5000;
  const host = Enviroment.HOST;

  server.setMaxListeners(Infinity);
  EventEmitter.setMaxListeners(Infinity);

  if (Enviroment.APP_MODE === AppMode.Production) {
    bootstrap();

    global.GLOBAL_AGENT.HTTP_PROXY = Enviroment.HTTP_PROXY;
    global.GLOBAL_AGENT.HTTPS_PROXY = Enviroment.HTTPS_PROXY;
    global.GLOBAL_AGENT.NO_PROXY = Enviroment.NO_PROXY;
  }

  connectToDb();

  server.listen(port, host, () => {
    Logger.info(`Server is listening on ${host}:${port}`);
  });
};

startServer();