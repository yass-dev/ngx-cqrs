import {CqrsMessage} from "../model/cqrs-message";

export class HandlerNotFoundException extends Error {
  public constructor(message: CqrsMessage) {
    super(`Handler not found for ${message.constructor.name}`);
  }
}
