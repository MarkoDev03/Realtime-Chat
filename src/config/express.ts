import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hsts from "hsts";
import middleware from "../api/middleware/index";
import { errorHandler } from "../api/middleware/handlers/error-handler";
import { errorConvertor } from "../api/middleware/handlers/error-converter";
import { appendApiVersion } from "../api/middleware/handlers/append-version";
import morganMiddleware from "../api/middleware/handlers/morgan";
import { notFoundHandler } from "../api/middleware/handlers/not-found-handler";
import { corsFilter } from "./cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(hsts());
app.use(cors(corsFilter));
app.use(appendApiVersion);
app.use(morganMiddleware);
app.use("/api", middleware);
app.use(errorConvertor);
app.use("*", notFoundHandler);
app.use(errorHandler);

export default app;