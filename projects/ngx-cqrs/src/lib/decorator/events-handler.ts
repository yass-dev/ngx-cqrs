import {Type} from "@angular/core";
import 'reflect-metadata';
import {MetadataConstant} from "../constant/metadata-constant";
import {CqrsEvent} from "../model/cqrs-event";
import {CqrsEventsHandler} from "../interface/cqrs-events-handler";
import {CqrsRegistry} from "../registry/cqrs-registry";

export const EventsHandler = (...eventTypes: Type<CqrsEvent>[]): ClassDecorator => {
  return (target: object): void => {
    Reflect.defineMetadata(MetadataConstant.EVENT_TYPE_METADATA_KEY, eventTypes, target);
    CqrsRegistry.registerEventHandler(target as Type<CqrsEventsHandler<CqrsEvent>>);
  }
}
