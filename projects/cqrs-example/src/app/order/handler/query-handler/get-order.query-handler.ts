import {GetOrderQuery} from "../../query/get-order.query";
import {Order} from "../../model/order";
import {CqrsQueryHandler} from "ngx-cqrs/lib/interface/cqrs-query-handler";
import {QueryHandler} from "ngx-cqrs";

@QueryHandler(GetOrderQuery)
export class GetOrderQueryHandler implements CqrsQueryHandler<GetOrderQuery, Order> {
  public async execute(event: GetOrderQuery): Promise<Order> {
    return new Order(112, '0000-1111-2222-333', 5);
  }
}
