import {CqrsBus} from "./cqrs-bus";
import {CqrsCommand} from "../model/cqrs-command";
import {CqrsCommandHandler} from "../interface/cqrs-command-handler";
import {Injectable} from "@angular/core";
import 'reflect-metadata';
import {NgxCqrsModule} from "../ngx-cqrs.module";
import {CqrsEventBus} from "./cqrs-event-bus";
import {MetadataConstant} from "../constant/metadata-constant";
import {CqrsEvent} from "../model/cqrs-event";
import {HandlerNotFoundException} from "../exception/handler-not-found.exception";
import {CqrsRegistry} from "../registry/cqrs-registry";

@Injectable({
  providedIn: NgxCqrsModule
})
export class CqrsCommandBus extends CqrsBus<CqrsCommand, CqrsCommandHandler<CqrsCommand>, CqrsEvent[]> {
  public constructor(private readonly _eventBus: CqrsEventBus) {
    super(CqrsRegistry.commandHandlerRegistry, MetadataConstant.COMMAND_TYPE_METADATA_KEY);
  }

  public async publish(command: CqrsCommand): Promise<void> {
    const handler: CqrsCommandHandler<CqrsCommand> | null = this._getHandlerByMessage(command);
    if (handler === null) {
      throw new HandlerNotFoundException(command);
    }
    handler.execute(command)
      .then(this._eventBus.publishAll.bind(this._eventBus));
  }
}
