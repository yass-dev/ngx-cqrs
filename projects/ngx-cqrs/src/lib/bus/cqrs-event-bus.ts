import {CqrsBus} from "./cqrs-bus";
import {CqrsEvent} from "../model/cqrs-event";
import {CqrsEventsHandler} from "../interface/cqrs-events-handler";
import {NgxCqrsModule} from "../ngx-cqrs.module";
import {Injectable} from "@angular/core";
import {MetadataConstant} from "../constant/metadata-constant";
import {HandlerNotFoundException} from "../exception/handler-not-found.exception";
import {CqrsRegistry} from "../registry/cqrs-registry";

@Injectable({
  providedIn: NgxCqrsModule
})
export class CqrsEventBus extends CqrsBus<CqrsEvent, CqrsEventsHandler<CqrsEvent>> {
  public constructor() {
    super(CqrsRegistry.eventHandlerRegistry, MetadataConstant.EVENT_TYPE_METADATA_KEY);
  }

  public async publish(event: CqrsEvent): Promise<void> {
    const handler: CqrsEventsHandler<CqrsEvent> | null = this._getHandlerByMessage(event);
    if (handler === null) {
      throw new HandlerNotFoundException(event);
    }
    return handler.execute(event);
  }
}
