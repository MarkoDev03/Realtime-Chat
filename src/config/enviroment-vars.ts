import { IEnviromentVars } from "../api/models/interfaces/enviroment-vars";
import { config } from "dotenv";
import { AppMode } from "../common/enums";

config();

export const Enviroment: IEnviromentVars = {
  PORT: Number(process.env.PORT),
  HOST: process.env.HOST,
  APP_MODE: process.env.APP_MODE as AppMode,

  HTTP_PROXY: process.env.HTTP_PROXY,
  HTTPS_PROXY: process.env.HTTPS_PROXY,
  NO_PROXY: process.env.NO_PROXY,

  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(','),

  CONNECTION_STRING: process.env.CONNECTION_STRING,

  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SESSION_LIFE: process.env.JWT_SESSION_LIFE,
  JWT_REFRESH_TOKEN_SESSION_LIFE: process.env.JWT_REFRESH_TOKEN_SESSION_LIFE,

  RABBITMQ_URL: process.env.RABBITMQ_URL
}