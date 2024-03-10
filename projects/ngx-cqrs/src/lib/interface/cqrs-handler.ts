import {CqrsMessage} from "../model/cqrs-message";

export interface CqrsHandler<MessageType extends CqrsMessage, ResultType = void> {
  execute(message: MessageType): Promise<ResultType>;
}
