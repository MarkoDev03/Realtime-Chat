import { NotFound } from "../../errors/server-errors";

export const notFoundHandler = (): void => {
  throw new NotFound();
}