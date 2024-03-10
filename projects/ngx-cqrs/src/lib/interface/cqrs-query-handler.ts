import {CqrsHandler} from "./cqrs-handler";
import {CqrsQuery} from "../model/cqrs-query";
import {CqrsQueryResult} from "../model/cqrs-query-result";

export interface CqrsQueryHandler<QueryType extends CqrsQuery, QueryResult extends CqrsQueryResult> extends CqrsHandler<QueryType, QueryResult> {}
