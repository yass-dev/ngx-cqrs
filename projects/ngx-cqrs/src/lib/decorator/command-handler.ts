import {CqrsCommandHandler} from "../interface/cqrs-command-handler";
import {Type} from "@angular/core";
import 'reflect-metadata';
import {MetadataConstant} from "../constant/metadata-constant";
import {CqrsCommand} from "../model/cqrs-command";
import {CqrsRegistry} from "../registry/cqrs-registry";

export const CommandHandler = (commandType: Type<CqrsCommand>): ClassDecorator => {
  return (target: object): void => {
    Reflect.defineMetadata(MetadataConstant.COMMAND_TYPE_METADATA_KEY, commandType, target);
    CqrsRegistry.registerCommandHandler(target as Type<CqrsCommandHandler<CqrsCommand>>);
  }
}
