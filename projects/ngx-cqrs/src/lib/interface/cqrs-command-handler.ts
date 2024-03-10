import {CqrsEvent} from "../model/cqrs-event";
import {CqrsHandler} from "./cqrs-handler";
import {CqrsCommand} from "../model/cqrs-command";

export interface CqrsCommandHandler<CommandType extends CqrsCommand> extends CqrsHandler<CommandType, CqrsEvent[]> {}
