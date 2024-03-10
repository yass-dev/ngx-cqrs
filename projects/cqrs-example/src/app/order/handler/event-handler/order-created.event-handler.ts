import {Injectable} from "@angular/core";
import {OrderCreatedEvent} from "../../event/order-created.event";
import {GetOrderQuery} from "../../query/get-order.query";
import {CqrsQueryBus, EventsHandler} from "ngx-cqrs";
import {CqrsEventsHandler} from "ngx-cqrs/lib/interface/cqrs-events-handler";
import {CqrsQueryResult} from "ngx-cqrs/lib/model/cqrs-query-result";

@Injectable({
  providedIn: 'root'
})
@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler implements CqrsEventsHandler<OrderCreatedEvent> {
  public constructor(private readonly _queryBus: CqrsQueryBus) {}


  public async execute(event: OrderCreatedEvent): Promise<void> {
    console.debug(`Handle event`, event)
    this._queryBus.publish(new GetOrderQuery('0000-1111-2222-3333'))
      .then((result: CqrsQueryResult) => {
        console.debug('Result', result)
      });
  }
}
