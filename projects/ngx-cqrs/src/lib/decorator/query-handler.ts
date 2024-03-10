import {Type} from "@angular/core";
import 'reflect-metadata';
import {MetadataConstant} from "../constant/metadata-constant";
import {CqrsQueryHandler} from "../interface/cqrs-query-handler";
import {CqrsQuery} from "../model/cqrs-query";
import {CqrsQueryResult} from "../model/cqrs-query-result";
import {CqrsRegistry} from "../registry/cqrs-registry";

export const QueryHandler = (queryType: Type<CqrsQuery>): ClassDecorator => {
  return (target: object): void => {
    Reflect.defineMetadata(MetadataConstant.QUERY_TYPE_METADATA_KEY, queryType, target);
    CqrsRegistry.registerQueryHandler(target as Type<CqrsQueryHandler<CqrsQuery, CqrsQueryResult>>);
  }
}
