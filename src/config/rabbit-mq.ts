import amqplib, { Channel, Connection, ConsumeMessage } from "amqplib";
import { BadRequest } from "../api/errors/server-errors";
import { Constants } from "../common/constants";
import { Enviroment } from "./enviroment-vars";

export class RabbitMQ {

  connection: Connection;

  constructor() {
    RabbitMQ.connect()
      .then((connection: Connection) => {
        if (connection) {
          this.connection = connection;
        }
      });
  }

  private static async connect(): Promise<Connection> {
    try {
      const connection: Connection = await amqplib.connect(Enviroment.RABBITMQ_URL);

      if (!connection) {
        throw new BadRequest(Constants.RABBITMQ_CONNECTION_FAILED);
      }

      connection.on("error", (e) => {
        throw new BadRequest(e);
      });

      return connection;
    } catch (error) {
      throw new BadRequest(error?.message ?? Constants.RABBITMQ_CONNECTION_FAILED);
    }
  }

  public async createChannel(channelName: string): Promise<Channel> {
    try {
      const channel: Channel = await this.connection.createChannel();
      await channel.assertQueue(channelName);
      return channel;
    } catch (error) {
      throw new BadRequest(error?.message ?? Constants.FAILED_TO_CREATE_QUEUE);
    }
  }

  public sendMessage(channel: Channel, queue: string, data: string): void {
    try {
      if (channel === null) {
        throw new BadRequest(Constants.CHANNEL_IS_NULL);
      }

      channel.sendToQueue(queue, Buffer.from(data));
    } catch (error) {
      throw new BadRequest(error?.message ?? Constants.FAILED_TO_PRODUCE_MESSAG);
    }
  }

  public consumeMessages(channel: Channel, queue: string, callback: (message: string) => {}) {
    channel.consume(queue, (message: ConsumeMessage) => {
      channel.ack(message);
      callback(message.content.toString());
    })
  }
}