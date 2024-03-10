import {Injectable} from "@angular/core";
import {ProductCreatedEvent} from "../../message/event/product-created.event";
import {GetProductQuery} from "../../message/query/get-product.query";
import {CqrsQueryBus, EventsHandler} from "ngx-cqrs";
import {CqrsEventsHandler} from "ngx-cqrs/lib/interface/cqrs-events-handler";
import {CqrsQueryResult} from "ngx-cqrs/lib/model/cqrs-query-result";
import {Product} from "../../model/product";

@Injectable({
  providedIn: 'root'
})
@EventsHandler(ProductCreatedEvent)
export class ProductCreatedEventHandler implements CqrsEventsHandler<ProductCreatedEvent> {
  public constructor(private readonly _queryBus: CqrsQueryBus) {}


  public async execute(productCreatedEvent: ProductCreatedEvent): Promise<void> {
    this._queryBus.publish<Product>(new GetProductQuery(productCreatedEvent.createdProductId))
      .then((product: Product) => {
        console.debug(product);
      });
  }
}
