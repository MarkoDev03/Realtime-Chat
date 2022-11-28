import { AppMode } from "../../../common/enums";

export interface IEnviromentVars { 
  PORT: number;
  HOST: string;
  APP_MODE: AppMode;

  HTTP_PROXY: string;
  HTTPS_PROXY: string;
  NO_PROXY: string;

  ALLOWED_ORIGINS: string[];

  CONNECTION_STRING: string;
}