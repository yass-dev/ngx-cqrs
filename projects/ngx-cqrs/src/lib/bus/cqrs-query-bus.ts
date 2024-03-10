import {CqrsBus} from "./cqrs-bus";
import {NgxCqrsModule} from "../ngx-cqrs.module";
import {Injectable} from "@angular/core";
import {MetadataConstant} from "../constant/metadata-constant";
import {CqrsQuery} from "../model/cqrs-query";
import {CqrsQueryHandler} from "../interface/cqrs-query-handler";
import {CqrsQueryResult} from "../model/cqrs-query-result";
import {HandlerNotFoundException} from "../exception/handler-not-found.exception";
import {CqrsRegistry} from "../registry/cqrs-registry";

@Injectable({
  providedIn: NgxCqrsModule
})
export class CqrsQueryBus extends CqrsBus<CqrsQuery, CqrsQueryHandler<CqrsQuery, CqrsQueryResult>, CqrsQueryResult, CqrsQueryResult> {
  public constructor() {
    super(CqrsRegistry.queryHandlerRegistry, MetadataConstant.QUERY_TYPE_METADATA_KEY);
  }

  public publish(query: CqrsQuery): Promise<CqrsQueryResult> {
    const handler: CqrsQueryHandler<CqrsQuery, CqrsQueryResult> | null = this._getHandlerByMessage(query);
    if (handler === null) {
      throw new HandlerNotFoundException(query);
    }
    return handler.execute(query);
  }
}
