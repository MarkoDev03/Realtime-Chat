import { Request, Response, NextFunction } from "express";
import { APIError } from "../errors/api-error";
import { EventEmitter } from "events";
import { v4 } from "uuid";

const emitter = new EventEmitter();

export const live = (req: Request, res: Response, next: NextFunction): void => {
  try {

    const { roomId } = req.params;

    emitter.on("message", (message) => {
      console.log(message.roomId)
      if (roomId === message?.roomId) {
        res.write(message.message + "\n");
      }
    });

  } catch (error) {
    throw new APIError(error?.message, error?.status);
  }
}

export const logIn = (req: Request, res: Response, next: NextFunction): void => {
  try {

    const { username, roomId } = req.body;

    const msg = {
      message: `${username} joined chat.`,
      roomId: roomId
    };

    res.status(200).json(msg)
    emitter.emit("message", msg);
  } catch (error) {
    throw new APIError(error?.message, error?.status);
  }
}

export const getToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).send(v4() + v4());
  } catch (error) {
    throw new APIError(error?.message, error?.status);
  }
}

export const sendMessage = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { username, roomId, message } = req.body;

    const msg = {
      message: `${username}: ${message}`,
      roomId: roomId
    };

    res.status(200).json(msg)

    emitter.emit("message", msg);
  } catch (error) {
    throw new APIError(error?.message, error?.status);
  }
}
