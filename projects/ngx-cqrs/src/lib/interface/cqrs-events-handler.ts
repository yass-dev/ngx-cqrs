import {CqrsEvent} from "../model/cqrs-event";
import {CqrsHandler} from "./cqrs-handler";

export interface CqrsEventsHandler<EventType extends CqrsEvent> extends CqrsHandler<EventType> {}
