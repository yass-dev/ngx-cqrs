import {Type} from "@angular/core";
import {CqrsCommandHandler} from "../interface/cqrs-command-handler";
import {CqrsCommand} from "../model/cqrs-command";
import {CqrsEventsHandler} from "../interface/cqrs-events-handler";
import {CqrsEvent} from "../model/cqrs-event";
import {CqrsQueryHandler} from "../interface/cqrs-query-handler";
import {CqrsQuery} from "../model/cqrs-query";
import {CqrsQueryResult} from "../model/cqrs-query-result";

export class CqrsRegistry {
  public static readonly commandHandlerRegistry: Set<Type<CqrsCommandHandler<CqrsCommand>>> = new Set();
  public static readonly eventHandlerRegistry: Set<Type<CqrsEventsHandler<CqrsEvent>>> = new Set();
  public static readonly queryHandlerRegistry: Set<Type<CqrsQueryHandler<CqrsQuery, CqrsQueryResult>>> = new Set();

  public static registerCommandHandler(commandHandler: Type<CqrsCommandHandler<CqrsCommand>>): void {
    CqrsRegistry.commandHandlerRegistry.add(commandHandler);
  }

  public static registerEventHandler(eventHandler: Type<CqrsEventsHandler<CqrsEvent>>): void {
    CqrsRegistry.eventHandlerRegistry.add(eventHandler);
  }

  public static registerQueryHandler(queryHandler: Type<CqrsQueryHandler<CqrsQuery, CqrsQueryResult>>): void {
    CqrsRegistry.queryHandlerRegistry.add(queryHandler);
  }
}
